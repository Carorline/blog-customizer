import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// interface ArticleParams {
// 	fontFamilyOption: OptionType;
// 	fontSizeOption: OptionType;
// 	fontColor: OptionType;
// 	backgroundColor: OptionType;
// 	contentWidth: OptionType;
// }

// interface ArticleParamsFormProps {
// 	onApply: (params: ArticleParams) => void;
// }

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColors, setSelectedFontColors] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColors, setSelectedBackgroundColors] =
		useState<OptionType>(defaultArticleState.backgroundColor);

	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const handleChangeFontFamily = (selectedOption: OptionType) => {
		setSelectedFontFamily(selectedOption);
	};
	const handleChangeFontSize = (selectedOption: OptionType) => {
		setSelectedFontSize(selectedOption);
	};
	const handleChangeFontColors = (selectedOption: OptionType) => {
		setSelectedFontColors(selectedOption);
	};
	const handleChangeBackgroundColors = (selectedOption: OptionType) => {
		setSelectedBackgroundColors(selectedOption);
	};
	const handleChangeContentWidth = (selectedOption: OptionType) => {
		setSelectedContentWidth(selectedOption);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		selectedFontFamily;
		selectedFontSize;
		selectedFontColors;
		selectedBackgroundColors;
		selectedContentWidth;
		setIsOpen(false);
	};

	const handleReser = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColors(defaultArticleState.fontColor);
		setSelectedBackgroundColors(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReser}>
					<Text
						as='h2'
						size={31}
						dynamic={false}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'
						dynamicLite={false}>
						Задайте параметры
					</Text>
					<div className={styles.select}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={selectedFontFamily}
							onChange={handleChangeFontFamily}
						/>
					</div>
					<div className={styles.select}>
						<RadioGroup
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={handleChangeFontSize}
							name='font-size'
						/>
					</div>
					<div className={styles.select}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={selectedFontColors}
							onChange={handleChangeFontColors}
						/>
					</div>
					<div className={styles.select}>
						<Separator />
					</div>
					<div className={styles.select}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={selectedBackgroundColors}
							onChange={handleChangeBackgroundColors}
						/>
					</div>
					<div className={styles.select}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={selectedContentWidth}
							onChange={handleChangeContentWidth}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
