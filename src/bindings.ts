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

/** @hidden SimpleBLE Adapter. */
export type Adapter = bigint;
/** @hidden SimpleBLE Peripheral. */
export type Peripheral = bigint;
/** @hidden SimpleBLE UserData. */
export type UserData = bigint | null;

/** @hidden SimpleBLE Characteristic. */
export interface Characteristic {
    uuid: string;
    descriptors: string[];
}

/** @hidden A SimpleBLE service. */
export interface Service {
    uuid: string;
    characteristics: Characteristic[];
}

/** @hidden SimpleBLE manufacturer data. */
export interface ManufacturerData {
    id: number;
    data: Uint8Array;
}

/** @hidden SimpleBLE bindings. */
export interface Bindings {
    /** Returns if a Bluetooth adapter is available. */
    simpleble_adapter_is_bluetooth_enabled(): boolean;
    /** Returns the number of available adapters. */
    simpleble_adapter_get_count(): number;
    /** Returns a handle to an adapter. */
    simpleble_adapter_get_handle(index: number): Adapter;
    /** Deallocate the resources associated with an adapter. */
    simpleble_adapter_release_handle(handle: Adapter): void;
    /** Get the human-readable adapter name. */
    simpleble_adapter_identifier(handle: Adapter): string;
    /** Get the unique MAC address. */
    simpleble_adapter_address(handle: Adapter): string;
    /** Scan for `timeout` milliseconds (blocks the main thread). */
    simpleble_adapter_scan_for(handle: Adapter, timeout: number): boolean;
    /** Start scanning for peripherals. */
    simpleble_adapter_scan_start(handle: Adapter): boolean;
    /** Stop scanning for peripherals. */
    simpleble_adapter_scan_stop(handle: Adapter): boolean;
    /** Returns the scanning status. */
    simpleble_adapter_scan_is_active(handle: Adapter): boolean;
    /** Returns the number of peripherals. */
    simpleble_adapter_scan_get_results_count(handle: Adapter): number;
    /** Returns a handle to a peripheral. */
    simpleble_adapter_scan_get_results_handle(handle: Adapter, index: number): Peripheral;
    /** Returns the number of paired peripherals. */
    simpleble_adapter_get_paired_peripherals_count(handle: Adapter): number;
    /** Returns a handle to a paired peripheral. */
    simpleble_adapter_get_paired_peripherals_handle(handle: Adapter, index: number): Peripheral;
    /** Register a callback for when the adapter begins scanning. */
    simpleble_adapter_set_callback_on_scan_start(
        handle: Adapter,
        cb: (adapter: Adapter, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** Register a callback for when the adapter stops scanning. */
    simpleble_adapter_set_callback_on_scan_stop(
        handle: Adapter,
        cb: (adapter: Adapter, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** Register a callback for when the adapter changes. */
    simpleble_adapter_set_callback_on_updated(
        handle: Adapter,
        cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** Register a callback for when a peripheral is found. */
    simpleble_adapter_set_callback_on_found(
        handle: Adapter,
        cb: (adapter: Adapter, peripheral: Peripheral, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** @hidden Deallocate resources for a Peripheral handle. */
    simpleble_peripheral_release_handle(handle: Peripheral): void;
    /** The human-readable device name. */
    simpleble_peripheral_identifier(handle: Peripheral): string;
    /** The unique device address. */
    simpleble_peripheral_address(handle: Peripheral): string;
    /** Bluetooth signal strength. */
    simpleble_peripheral_rssi(handle: Peripheral): number;
    /** Bluetooth MTU (Maximum Transmission Unit). */
    simpleble_peripheral_mtu(handle: Peripheral): number;
    /** Connect to the device. */
    simpleble_peripheral_connect(handle: Peripheral): boolean;
    /** Disconnect from the device. */
    simpleble_peripheral_disconnect(handle: Peripheral): boolean;
    /** Returns if the device is currently connected. */
    simpleble_peripheral_is_connected(handle: Peripheral): boolean;
    /** Returns if the device can be connected to. */
    simpleble_peripheral_is_connectable(handle: Peripheral): boolean;
    /** Returns if the device is paired or not. */
    simpleble_peripheral_is_paired(handle: Peripheral): boolean;
    /** Unpair the device. */
    simpleble_peripheral_unpair(handle: Peripheral): boolean;
    /** Returns the number of services found. */
    simpleble_peripheral_services_count(handle: Peripheral): number;
    /** Returns information about a device service. */
    simpleble_peripheral_services_get(handle: Peripheral, index: number): Service;
    /** Gets the number of manufacturer data maps available. */
    simpleble_peripheral_manufacturer_data_count(handle: Peripheral): number;
    /** Returns the manufacturer's data. */
    simpleble_peripheral_manufacturer_data_get(handle: Peripheral, index: number): ManufacturerData | undefined;
    /** Reads data from the device. */
    simpleble_peripheral_read(handle: Peripheral, service: string, characteristic: string): Uint8Array | undefined;
    /** Writes data to the device (without waiting for a response). */
    simpleble_peripheral_write_request(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean;
    /** Writes data to the device. */
    simpleble_peripheral_write_command(handle: Peripheral, service: string, characteristic: string, data: Uint8Array): boolean;
    /** Subscribe to device notifications. */
    simpleble_peripheral_unsubscribe(handle: Peripheral, service: string, characteristic: string): boolean;
    /** Regiser a callback for when an indication (notification) is received. */
    simpleble_peripheral_indicate(
        handle: Peripheral,
        service: string,
        characteristic: string,
        cb: (
            service: string,
            characteristic: string,
            data: Uint8Array,
            userdata: UserData,
        ) => void,
        userdata: UserData,
    ): boolean;
    /** Regiser a callback for when a device notification is received. */
    simpleble_peripheral_notify(
        handle: Peripheral,
        service: string,
        characteristic: string,
        cb: (
            service: string,
            characteristic: string,
            data: Uint8Array,
            userdata: UserData
        ) => void,
        userdata: UserData,
    ): boolean;
    /** Register a callback for when the device is connected. */
    simpleble_peripheral_set_callback_on_connected(
        handle: Peripheral,
        cb: (peripheral: Peripheral, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** Register a callback for when the device is disconnected. */
    simpleble_peripheral_set_callback_on_disconnected(
        handle: Peripheral,
        cb: (peripheral: Peripheral, userdata: UserData) => void,
        userdata: UserData,
    ): boolean;
    /** Read data from a device descriptor. */
    simpleble_peripheral_read_descriptor(
        handle: Peripheral,
        service: string,
        characteristic: string,
        descriptor: string,
    ): Uint8Array | undefined;
    /** Write data to a device descriptor. */
    simpleble_peripheral_write_descriptor(
        handle: Peripheral,
        service: string,
        characteristic: string,
        descriptor: string,
        data: Uint8Array,
    ): boolean;
    /** @hidden Release memory allocated. */
    simpleble_free(handle: bigint): void;
}

/** @hidden A function to load native SimpleBLE bindings. */
export type BindingsResolver = () => Bindings | Promise<Bindings>;
