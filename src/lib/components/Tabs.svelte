<script>
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul>
	{#each items as item}
		<li class={activeTabValue === item.value ? 'active' : ''}>
			<span on:click={handleClick(item.value)}>{item.label}</span>
		</li>
	{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
		<div>
			<svelte:component this={item.component} {...item.props} />
		</div>
	{/if}
{/each}

<style>
	div {
		height: 50dvh;
		overflow-y: auto;
		width: 90vw;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		padding-left: auto;
		padding-right: auto;
		margin-bottom: 0;
		list-style: none;
		border-bottom: 1px solid #dee2e6;
	}
	li {
		margin-bottom: -1px;
	}

	span {
		border: 1px solid transparent;
		border-top-left-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		display: block;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	span:hover {
		border-color: #e9ecef #e9ecef #dee2e6;
	}

	li.active > span {
		color: #495057;
		background-color: #fff;
		border-color: #dee2e6 #dee2e6 #fff;
	}
</style>
