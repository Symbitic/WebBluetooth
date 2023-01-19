/*
 * Node Web Bluetooth
 * Copyright (c) 2019 Rob Moran
 *
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { bluetooth } from "../dist/index.js";
import type { BluetoothRemoteGATTCharacteristic } from "../dist/index.js";

function onHeartRateChanged(event: Event) {
    const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
    console.log(characteristic.value);
    //if (event.value.buffer.byteLength) console.log(event.value.getUint16(0));
}

(async () => {
	try {
		console.log("Requesting Bluetooth Devices...");

		const device = await bluetooth.requestDevice({
			filters: [{ services: [ "heart_rate" ] }]
		});
		console.log(`Found device: ${device.name}`);

		const server = await device.gatt.connect();
		console.log(`Gatt server connected: ${server.connected}`);

		const service = await server.getPrimaryService("heart_rate");
		console.log(`Primary service: ${service.uuid}`);

		const characteristic = await service.getCharacteristic("heart_rate_measurement");
		console.log(`Characteristic: ${characteristic.uuid}`);

		await characteristic.startNotifications();
		console.log("Notifications started");

        characteristic.addEventListener("characteristicvaluechanged", onHeartRateChanged);
	} catch(error) {
		console.log(error);
		process.exit(1);
	};
})();