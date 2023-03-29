import { SkeletonBlock } from "skeleton-elements/react";
import "skeleton-elements/css";

export function Skeleton() {
  const effect = 'wave'

  return (
    <>
      <SkeletonBlock tag="div" width="500px" height="580px" borderRadius="6px" effect={effect} />
        <div>
        <SkeletonBlock tag="div" width="250px" height="20px" borderRadius="6px" effect={effect} />
        <SkeletonBlock tag="div" width="120px" height="20px" borderRadius="6px" effect={effect} />

        <div>
          <SkeletonBlock tag="div" width="500px" height="20px" borderRadius="6px" effect={effect} />
          <SkeletonBlock tag="div" width="480px" height="20px" borderRadius="6px" effect={effect} />
          <SkeletonBlock tag="div" width="450px" height="20px" borderRadius="6px" effect={effect} />
        </div>
      </div>
    </>
  )
}
