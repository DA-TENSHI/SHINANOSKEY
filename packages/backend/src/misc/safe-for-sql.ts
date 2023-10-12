/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export function safeForSql(text: string): boolean {
	return !/[\0\x08\x09\x1a\n\r"'\\\%]/g.test(text);
}
