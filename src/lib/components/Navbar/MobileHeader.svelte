<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import {
		Home,
		LineChart,
		Package,
		Package2,
		PanelLeft,
		ShoppingCart,
		UsersRound
	} from 'lucide-svelte';
	import MobileLink from './MobileLink.svelte';

	export let path: string;
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
			<PanelLeft class="h-5 w-5" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="sm:max-w-xs">
		<nav class="grid gap-6 text-lg font-medium">
			<a
				href="/dashboard"
				class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
			>
				<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
				<span class="sr-only">MyCommerce</span>
			</a>
			<MobileLink icon="HomeIconBlack.png" {path} href="/" name="Home" filter={true} />
			<MobileLink
				icon="AvatarIcon.png"
				{path}
				href="/characters"
				name="Characters"
				filter={false}
			/>
			<MobileLink
				icon="RelicsIconBlack.png"
				{path}
				href="/relic-scorer"
				name="Relic Scorer"
				filter={true}
			/>
			<MobileLink
				icon="AchievementIcon.png"
				{path}
				href="/achievements"
				name="Achievements"
				filter={false}
			/>
			<MobileLink icon="DataBankIcon.png" {path} href="/databank" name="Databank" filter={false} />
		</nav>
	</Sheet.Content>
</Sheet.Root>
