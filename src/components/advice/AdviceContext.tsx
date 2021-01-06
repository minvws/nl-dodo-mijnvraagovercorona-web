import React from 'react';

const AdviceContext = React.createContext<{
	destination?: string;
	setDestination?: Function;
	stage?: string;
	setStage?: Function;
	from?: string;
	setFrom?: Function;
	to?: string;
	setTo?: Function;
}>({});

type Props = {
	children: React.ReactNode;
};

export const AdviceProvider = ({ children }: Props) => {
	const [destination, setDestination] = React.useState();
	const [stage, setStage] = React.useState();
	const [from, setFrom] = React.useState();
	const [to, setTo] = React.useState();

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
			}}
		>
			{children}
		</AdviceContext.Provider>
	);
};

export const AdviceConsumer = AdviceContext.Consumer;

export default AdviceContext;
