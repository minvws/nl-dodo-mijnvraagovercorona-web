/** @jsx jsx */
import React from 'react';

import App from 'next/app';
import Head from 'next/head';

import { jsx, ThemeProvider } from 'theme-ui';

import theme from '../utilities/styling/theme';
import '../styles/global.css';
import '../styles/components/PeriodSelect.css';

class TravelCheckApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=2.0, user-scalable=yes"
					/>

					<title>Travel Check Development</title>
				</Head>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		);
	}
}

export default TravelCheckApp;
