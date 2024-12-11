/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export async function sleep(ms = 200) {
	return new Promise<void>((r) => setTimeout(() => r(), ms));
}
