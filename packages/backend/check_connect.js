/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-FileCopyrightText: Copyright © 2023 taiy https://github.com/taiyme
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import Redis from 'ioredis';
import { loadConfig } from './built/config.js';

const config = loadConfig();
const redis = new Redis(config.redis);

redis.on('connect', () => redis.disconnect());
redis.on('error', (e) => {
	throw e;
});
