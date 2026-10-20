"""music-bed.py — a soft ambient pad under the voice, made here (no licensing questions).

    python music-bed.py <clip-to-match-length> <out.wav>

Slow major-seventh chords (D major: Dmaj9 → Bm9 → Gmaj9 → A6sus), 9 s each with long
cross-fades; every note is a sine plus a quieter octave, slightly detuned left/right for width,
low-passed, with a slow breathing swell and a soft reverb tail. Calm on purpose — it fills the
learner's pauses without pulling attention, and face.mjs ducks it further under the voice.
Deterministic (fixed seed), so the same episode always gets the same bed.
"""
import json, subprocess, sys, wave, os
import numpy as np

src, out = sys.argv[1], sys.argv[2]
_ff = os.environ.get("FFMPEG", "ffmpeg")
ffprobe = os.path.join(os.path.dirname(_ff), os.path.basename(_ff).replace("ffmpeg", "ffprobe"))  # only the file name
try:
    dur = float(subprocess.run([ffprobe, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src],
                               capture_output=True, text=True).stdout)
except Exception:
    dur = float(sys.argv[3]) if len(sys.argv) > 3 else 300.0

SR = 44100
n = int((dur + 1) * SR)
t = np.arange(n) / SR
rng = np.random.default_rng(31)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
# MIDI notes, voiced low and open (no note in the 1–4 kHz band where speech is clearest)
CHORDS = [
    [50, 57, 61, 64, 66],   # Dmaj9  D3 A3 C#4 E4 F#4
    [47, 54, 57, 61, 62],   # Bm9    B2 F#3 A3 C#4 D4
    [43, 50, 54, 57, 62],   # Gmaj9  G2 D3 F#3 A3 D4 (open)
    [45, 52, 57, 59, 61],   # A6sus  A2 E3 A3 B3 C#4
]
SEG, XF = 9.0, 3.5
L = np.zeros(n); R = np.zeros(n)
k = 0
start = -XF
while start < dur + 1:
    notes = CHORDS[k % len(CHORDS)]
    a, b = max(0, int(start * SR)), min(n, int((start + SEG + XF) * SR))
    if b > a:
        tt = t[a:b] - start
        env = np.clip(tt / XF, 0, 1) * np.clip((SEG + XF - tt) / XF, 0, 1)
        env = env * env * (3 - 2 * env)               # smoothstep: no clicks, no edges
        for m in notes:
            f = hz(m)
            ph = rng.uniform(0, 2 * np.pi)
            for side, det in ((L, -0.6), (R, 0.6)):  # a few cents apart → slow, wide chorus
                v = np.sin(2 * np.pi * (f + det) * tt + ph) + 0.18 * np.sin(2 * np.pi * 2 * (f + det) * tt + ph)
                side[a:b] += v * env / len(notes)
    start += SEG
    k += 1

# slow breathing swell (one cycle every ~11 s) and a gentle low-pass
swell = 0.82 + 0.18 * np.sin(2 * np.pi * t / 11.0)
L *= swell; R *= swell
def lowpass(x, fc, sr):
    a = np.exp(-2 * np.pi * fc / sr); y = np.empty_like(x); acc = 0.0
    for i in range(0, len(x), 4096):                    # chunked one-pole, applied twice
        seg = x[i:i + 4096]; o = np.empty_like(seg)
        for j, v in enumerate(seg):
            acc = (1 - a) * v + a * acc; o[j] = acc
        y[i:i + 4096] = o
    return y
# vectorised one-pole via scipy-free cumulative trick is overkill here; downsample instead:
# the pad has nothing above ~1.4 kHz, so filter at 1/8 rate and upsample back
def soft(x):
    d = x[::8]
    d = lowpass(lowpass(d, 1400, SR / 8), 1400, SR / 8)   # coefficient at the reduced rate
    return np.interp(np.arange(len(x)), np.arange(len(d)) * 8, d)
L, R = soft(L), soft(R)

# soft reverb: a 2.8 s decaying-noise impulse, applied with FFT convolution
ir_len = int(2.8 * SR)
ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / (0.9 * SR))
ir /= np.sqrt(np.sum(ir ** 2))
def conv(x):
    m = len(x) + ir_len - 1; N = 1 << (m - 1).bit_length()
    return np.fft.irfft(np.fft.rfft(x, N) * np.fft.rfft(ir, N), N)[: len(x)]
L = 0.7 * L + 0.3 * conv(L); R = 0.7 * R + 0.3 * conv(R)

# fade in / out, normalise to −20 dBFS RMS (face.mjs sets the final level under the voice)
fade = np.clip(t / 3.0, 0, 1) * np.clip((dur - t) / 4.0, 0, 1)
L *= fade; R *= fade
rms = np.sqrt(np.mean((L ** 2 + R ** 2) / 2)) + 1e-9
g = 10 ** (-20 / 20) / rms
st = np.stack([L * g, R * g], axis=1)
st = np.clip(st, -0.98, 0.98)
with wave.open(out, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype(np.int16).tobytes())
print(f"ok music bed {dur:.1f}s -> {out}")
