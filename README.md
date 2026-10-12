# betty2-cloud

Render-only copy of the English Unlocked project (built by `render/cloud-pack.mjs` in betty2).
Episodes render on GitHub Actions in parallel; every MP4 is attached to the **renders** release.

    gh workflow run render.yml -f eps=24,25,26
    gh release download renders -D out -p "*.mp4"
