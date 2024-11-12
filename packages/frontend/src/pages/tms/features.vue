<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><MkPageHeader/></template>
	<template #default>
		<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
			<FormSuspense :p="ready">
				<XFeaturesForm/>
			</FormSuspense>
		</MkSpacer>
	</template>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { tmsFlaskStore } from '@/tms/flask-store.js';
import { tmsStore } from '@/tms/store.js';
import FormSuspense from '@/components/form/suspense.vue';

const ready = async () => {
	await tmsStore.loaded;
	await tmsFlaskStore.loaded;
};

const XFeaturesForm = defineAsyncComponent(() => import('@/pages/tms/features.form.vue'));

definePageMetadata(() => ({
	title: i18n.ts._tms.taiymeFeatures,
	icon: 'ti ti-settings-plus',
}));
</script>
