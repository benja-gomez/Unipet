<!-- Reference: https://dribbble.com/shots/16221169-Figma-Material-Ui-components-Steppers-and-sliders -->
<script>
	// Slots
	/**
	 * @slot header - Override the auto-generated heading with your own value. Typically a step title.
	 */

	import { getContext } from 'svelte';
	import { slide } from 'svelte/transition';

	// Props
	/** Indicates the step index value. Should start with 0 (zero) */
	export let index = 0;
	/** When enabled, a lock icon appears and Siguente button is disabled, preventing progress. */
	export let locked = false;

	// Base Classes
	const cBase = 'grid grid-cols-[32px_1fr] gap-4';
	const cLine = 'w-1 h-full';
	const cLineBackground = 'bg-slate-600';
	const cNumeral = 'font-bold text-white w-8 h-8 rounded-full flex justify-center items-center';
	const cNumralBackground = 'bg-slate-600';
	const cDrawer = 'ml-1 space-y-4';
	const cNav = 'flex items-center space-x-2';

	// Context
	export let dispatch = getContext('dispatch');
	export let active = getContext('active');
	export let length = getContext('length');
	export let duration = getContext('duration');
	// Context (overrides)
	export let color = getContext('color');
	export let background = getContext('background');
	export let buttonBack = getContext('buttonBack');
	export let buttonSiguente = getContext('buttonSiguente');
	export let buttonComplete = getContext('buttonComplete');

	// Step Handlers
	function stepPrev() {
		active.set($active - 1);
	}
	function stepSiguente() {
		active.set($active + 1);
	}
	function onComplete() {
		dispatch('complete', {});
	}

	// Reactive
	$: isLastItem = index === length - 1;
	// Base
	$: classesBase = `${cBase} ${$$props.class ?? ''}`;
	// Timeline (line)
	$: classesLineBackgroundColor = index < $active ? `${background}` : `${cLineBackground}`;
	$: classesLineBackground = !isLastItem ? `${classesLineBackgroundColor}` : '';
	$: classesLine = `${cLine} ${classesLineBackground}`;
	// Timeline (numeral)
	$: classesNumeralBackground =
		index <= $active ? `${color} ${background}` : `${cNumralBackground}`;
	$: classesNumeral = `${cNumeral} ${classesNumeralBackground}`;
	// Content Drawer
	$: classesDrawerPadding = !isLastItem ? 'pb-10' : '0';
	$: classesDrawer = `${cDrawer} ${classesDrawerPadding}`;
	// Content Nav
	$: classesNav = `${cNav}`;
</script>

<div class="step w-full {classesBase}" data-testid="step">
	<!-- Timeline -->
	<div class="step-timeline flex flex-col items-center w-full">
		<!-- Numeral -->
		<div class="step-numeral flex-none {classesNumeral}">
			{#if locked}
				🔒
			{:else}
				{@html index < $active ? '&check;' : index + 1}
			{/if}
		</div>
		<!-- Line -->
		{#if !isLastItem}<div class="step-line {classesLine}" />{/if}
	</div>
	<!-- Content -->
	<div class="step-content {classesDrawer} w-full">
		<!-- Slot: Header -->
		<header class="step-header "><slot name="header"><h4>Step {index + 1}</h4></slot></header>
		{#if index === $active}
			<div class="step-body space-y-4" transition:slide|local={{ duration }}>
				<!-- Slot: Default -->
				<slot />
				<!-- Nav -->
				<footer class="step-navigation {classesNav}">
					{#if index !== 0}<button class="btn btn-sm {buttonBack}" on:click={stepPrev}
							>&uarr;</button
						>{/if}
					{#if $active + 1 < length}
						<button
							class="btn btn-sm bg-lime-500 {buttonSiguente}"
							on:click={stepSiguente}
							disabled={locked}>Siguente &darr;</button
						>
					{:else}
						<button class="btn btn-sm {buttonComplete}" on:click={onComplete} disabled={locked}
							>Completar</button
						>
					{/if}
				</footer>
			</div>
		{/if}
	</div>
</div>
