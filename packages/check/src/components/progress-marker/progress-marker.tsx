import { ProgressMarker as ProgressMarkerCommon } from '@quarantaine/common';

export const ProgressMarker = ({
	currentStage,
	currentStageLabel,
}: {
	currentStage: number;
	currentStageLabel: string;
}) => {
	return (
		<ProgressMarkerCommon
			currentStageLabel={currentStageLabel}
			currentStage={currentStage}
			// We link twice to 'jouw-situatie' page because the last link never will be
			// visible, and otherwise I had to pass on a dynamic url which would never be used..
			stageLinks={['/jouw-situatie', '/jouw-situatie']}
		/>
	);
};
