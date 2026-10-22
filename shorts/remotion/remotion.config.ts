import { Config } from "@remotion/cli/config";

// JPEG frames are plenty for a CRF-18 H.264 short and much faster to capture
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setCodec("h264");
Config.setCrf(18);
// on machines where the Chrome download is blocked, point Remotion at an installed Chrome
if (process.env.CHROME) Config.setBrowserExecutable(process.env.CHROME);
