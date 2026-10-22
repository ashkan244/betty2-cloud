import React from "react";
import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import { Short, ShortData, ShortProps } from "./Short";
import ids from "./ids.json";

// one composition per short; data + clip come from public/<id>/ (copied from shorts/src/<id>/)
const calculateMetadata: CalculateMetadataFunction<ShortProps> = async ({ props }) => {
  const data: ShortData = await fetch(staticFile(`${props.id}/data.json`)).then((r) => r.json());
  return { durationInFrames: Math.round(data.duration * data.fps), fps: data.fps, props: { ...props, data } };
};

export const RemotionRoot: React.FC = () => (
  <>
    {(ids as string[]).map((id) => (
      <Composition key={id} id={id} component={Short} width={1080} height={1920} fps={30} durationInFrames={300}
        defaultProps={{ id }} calculateMetadata={calculateMetadata} />
    ))}
  </>
);
