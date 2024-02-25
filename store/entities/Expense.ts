export interface Expense {
	_id: string;
	amount: number;
	currency: 'EUR' | 'RUB';
	description?: string;
	category: string;
	date: string;
}
