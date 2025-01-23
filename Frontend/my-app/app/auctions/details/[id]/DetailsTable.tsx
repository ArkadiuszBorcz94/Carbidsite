'use client';

import {Auction} from "@/types";
import {Table} from "flowbite-react";

type Props = {
    auction: Auction
}
export default function DetailsTable({auction}: Props) {
    return (
        <Table striped={true}>
            <Table.Body className="divide-y ">
                <Table.Row  className="bg-gray-400 dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="bg-gray-300 whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Sprzedający:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.seller}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className=" bg-gray-300  whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Marka:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.make}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="bg-gray-300 whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Model:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.model}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="bg-gray-300  whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Rok produkcji:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.year}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="bg-gray-300  whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Przebieg:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.milage}
                    </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="bg-gray-300  whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        Cena wywoławcza:
                    </Table.Cell>
                    <Table.Cell className="bg-gray-300 font-bold">
                        {auction.reservePrice > 0 ? 'Tak' : 'Nie'}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}