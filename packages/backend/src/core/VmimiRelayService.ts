/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Inject, Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';
import { bindThis } from '@/decorators.js';
import { HttpRequestService } from '@/core/HttpRequestService.js';
import { LoggerService } from '@/core/LoggerService.js';
import Logger from '@/logger.js';

type VmimiInstanceList = { Url: string; }[];

const updateInterval = 1000 * 60 * 60 * 24; // 1 day
const minRetryInterval = 1000 * 60; // 5 minutes
const maxRetryInterval = 1000 * 60 * 60 * 6; // 6 hour

@Injectable()
export class VmimiRelayService {
	private logger: Logger;

	instaceHosts: Set<string>;
	instanceHostsArr: string[];
	nextUpdate: number;
	retryInterval: number;
	updatePromise: Promise<void> | null;

	constructor(
		private httpRequestService: HttpRequestService,
		private LoggerService: LoggerService,
	) {
		this.instaceHosts = new Set<string>([]);
		this.instanceHostsArr = [];
		this.nextUpdate = 0;
		this.retryInterval = minRetryInterval;
		this.updatePromise = null;

		this.logger = this.LoggerService.getLogger('VmimiRelay');
	}

	@bindThis
	public chechForUpdateInstanceList() {
		if (this.updatePromise == null && this.nextUpdate < Date.now()) {
			this.updatePromise = this.updateInstanceList().finally(() => this.updatePromise = null);
		}
	}

	@bindThis
	public async updateInstanceList() {
		try {
			this.logger.info("Updating Vmimi instance list...");
			const instanceList = await this.httpRequestService.getJson<VmimiInstanceList>('https://relay.virtualkemomimi.net/api/servers');

			this.instanceHostsArr = instanceList.map(i => new URL(i.Url).host);
			this.instaceHosts = new Set<string>(this.instanceHostsArr);
			this.nextUpdate = Date.now() + updateInterval;
			this.logger.info(`Updated Vmimi instance list: ${this.instanceHostsArr}`);
			this.retryInterval = minRetryInterval;
		} catch (e) {
			this.logger.error(`Failed to update Vmimi instance list: ${e}`);
			this.retryInterval = Math.min(this.retryInterval * 2, maxRetryInterval);
		}
	}

	@bindThis
	public isRelayedInstance(host: string | null): boolean {
		this.chechForUpdateInstanceList();

		if (host == null) return true;
		return this.instaceHosts.has(host);
	}

	get hostNames (): string[] {
		this.chechForUpdateInstanceList();
		return this.instanceHostsArr;
	}
}
