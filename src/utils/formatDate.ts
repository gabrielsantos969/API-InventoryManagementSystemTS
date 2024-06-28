import { format, isValid } from "date-fns";

const formatDateForMySQL = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
};

const formatDateForBr = (date: Date): string => {
    if (!date) undefined;
    return format(date, 'dd/MM/yyyy');
};

export { formatDateForMySQL, formatDateForBr };