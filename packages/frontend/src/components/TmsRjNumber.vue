<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<a
	ref="rootEl"
	:class="[$style.root, '_link']"
	:href="url"
	target="_blank"
	rel="nofollow noopener"
	:title="rjNumber"
>
	<span :class="[$style.inner, '_monospace']">{{ rjNumber }}</span>
</a>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, useTemplateRef } from 'vue';
import { isEnabledUrlPreview } from '@/instance.js';
import { popup } from '@/os.js';
import { useTooltip } from '@/scripts/use-tooltip.js';

const props = defineProps<{
	rjNumber: string;
	url: string;
}>();

const rootEl = useTemplateRef('rootEl');

useTooltip(rootEl, (showing) => {
	if (isEnabledUrlPreview.value && rootEl.value != null) {
		const { dispose } = popup(defineAsyncComponent(() => import('@/components/MkUrlPreviewPopup.vue')), {
			showing,
			url: props.url,
			source: rootEl.value,
		}, {
			closed: () => dispose(),
		});
	}
});
</script>

<style lang="scss" module>
.root {
	word-break: break-all;
}

.inner {
	padding: 0.2em 0.4em;
	font-size: 0.85em;
	white-space: break-spaces;
	background-color: var(--MI_THEME-buttonBg);
	border-radius: 6px;
}
</style>
