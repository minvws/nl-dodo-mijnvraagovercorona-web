import React from 'react';

export const meansOfTransport = [
	'vliegtuig',
	'auto',
	'trein',
	'bus',
	'anders',
] as const;

export type MeansOfTransport = typeof meansOfTransport[number];

export const travelStage = [
	'voor-vertrek',
	'tijdens-je-reis',
	'na-thuiskomst',
] as const;

export type TravelStage = typeof travelStage[number];

interface AdviesContextState {
	// @TODO: Check waarom Bart alle set methods optional gemaakt heeft.
	destination?: string;
	setDestination: Function;
	stage?: TravelStage;
	setStage?: Function;
	from?: string;
	setFrom?: Function;
	to?: string;
	setTo?: Function;
	meansOfTransport?: MeansOfTransport;
	setMeansOfTransport: (mean: MeansOfTransport) => void;
}

const AdviceContext = React.createContext<AdviesContextState>(
	{} as AdviesContextState,
);

type Props = {
	children: React.ReactNode;
};

export const AdviceProvider = ({ children }: Props) => {
	const [destination, setDestination] = React.useState();
	const [stage, setStage] = React.useState();
	const [from, setFrom] = React.useState();
	const [to, setTo] = React.useState();
	const [
		meansOfTransport,
		setMeansOfTransport,
	] = React.useState<MeansOfTransport>();

	return (
		<AdviceContext.Provider
			value={{
				destination,
				setDestination,
				stage,
				setStage,
				from,
				setFrom,
				to,
				setTo,
				meansOfTransport,
				setMeansOfTransport,
			}}
		>
			{children}
		</AdviceContext.Provider>
	);
};

export const AdviceConsumer = AdviceContext.Consumer;

export default AdviceContext;
