/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import cd from 'content-disposition';

export function contentDisposition(type: 'inline' | 'attachment', filename: string): string {
	const fallback = filename.replace(/[^\w.-]/g, '_');
	return cd(filename, { type, fallback });
}
