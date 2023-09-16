<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/** @restProps {a | button} */
	export let href: string | undefined = undefined;
	export let type: 'inline' | 'full' = 'full';
	export let disabled = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		if (disabled) return;
		dispatch('click');
	}
</script>

{#if href}
	<a href={disabled ? '' : href} class="button {type}" data-disabled={disabled} {...$$restProps}>
		<slot />
	</a>
{:else}
	<div
		role="button"
		tabindex="0"
		on:click={handleClick}
		class="button {type}"
		data-disabled={disabled}
		{...$$restProps}
	>
		<slot />
	</div>
{/if}

<style>
	.button {
		cursor: pointer;
		display: inline-block;
		user-select: none;
		margin: 5px;
		transition: all 125ms ease-in-out;
		text-decoration: none;
		box-sizing: border-box;
		text-align: center;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

		&.full {
			border-radius: 15px;
			padding: 15px;
		}

		&.inline {
			border-radius: 5px;
			padding: 6px;
		}

		background-color: var(--dark);
		color: var(--light);

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(0.95);
		}

		&[data-disabled='true'] {
			filter: grayscale(0.2) contrast(0.8);
			box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);

			&:hover,
			&:active {
				transform: scale(1);
			}
		}
	}
</style>
