// src/utils/processData.ts

interface DataItem {
    data: string;
    fonte: string;
    valor: number;
}

export interface ProcessedDataItem {
    data: string;
    [fonte: string]: number | string;
}

interface ProcessedData {
    processedData: ProcessedDataItem[];
    fontes: string[];
}

export const processData = (data: DataItem[], groupingValue: number = 1): ProcessedData => {

    const years = [...new Set(data.map((item) => item.data.slice(0, 4)))];
    const numGroups = Math.ceil(years.length / groupingValue);

    const processedData = Array.from({ length: numGroups }, (_, i) => {
        const startYear = years[i * groupingValue];
        const endYear = years[(i + 1) * groupingValue - 1] || years[years.length - 1];

        const filteredData = data.filter(
            (item) =>
                item.data.slice(0, 4) >= startYear &&
                item.data.slice(0, 4) <= endYear
        );

        const fontes = [...new Set(filteredData.map((item) => item.fonte))];

        const result: {
            data: string;
            [fonte: string]: number | string;
        } = {
            data: `${startYear}-${endYear}`,
        };

        fontes.forEach((fonte) => {
            const fonteData = filteredData.filter((item) => item.fonte === fonte);
            console.log("Soma do item atual: " + fonteData.reduce((sum, item) => sum + item.valor, 0) + " quantidade de anos: " + fonteData.length);
            const average =
                fonteData.reduce((sum, item) => sum + item.valor, 0) / fonteData.length;
            result[fonte] = average;
        });

        return result;
    });

    const fontes = Object.keys(processedData[0]).filter((key) => key !== 'date');

    return { processedData, fontes };
}
