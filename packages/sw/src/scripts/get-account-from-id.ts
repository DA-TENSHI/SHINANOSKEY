/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { get } from 'idb-keyval';

export async function getAccountFromId(id: string): Promise<{ token: string; id: string } | void> {
	const accounts = await get<{ token: string; id: string }[]>('accounts');
	if (!accounts) {
		console.log('Accounts are not recorded');
		return;
	}
	return accounts.find(e => e.id === id);
}
