// Local storage utility functions
const STORAGE_KEY = 'shopping-list-data';

class ShoppingListStorage {
    static getItems() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static saveItems(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    static addItem(item) {
        const items = this.getItems();
        items.push({
            id: Date.now().toString(),
            text: item,
            completed: false,
            createdAt: new Date().toISOString()
        });
        this.saveItems(items);
        return items;
    }

    static updateItem(id, newText) {
        const items = this.getItems();
        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            items[itemIndex].text = newText;
            this.saveItems(items);
        }
        return items;
    }

    static toggleItem(id) {
        const items = this.getItems();
        const itemIndex = items.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            items[itemIndex].completed = !items[itemIndex].completed;
            this.saveItems(items);
        }
        return items;
    }

    static deleteItem(id) {
        const items = this.getItems().filter(item => item.id !== id);
        this.saveItems(items);
        return items;
    }

    static clearCompleted() {
        const items = this.getItems().filter(item => !item.completed);
        this.saveItems(items);
        return items;
    }

    static clearAll() {
        this.saveItems([]);
        return [];
    }

    // Export data as JSON
    static exportData() {
        const data = this.getItems();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `shopping-list-export-${new Date().toISOString().slice(0, 19)}.json`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // Import data from JSON
    static importData(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);

            // Validate the imported data
            if (!Array.isArray(importedData)) {
                throw new Error('Invalid data format: expected an array');
            }

            // Validate each item in the array
            for (const item of importedData) {
                if (typeof item !== 'object' ||
                    typeof item.id !== 'string' ||
                    typeof item.text !== 'string' ||
                    typeof item.completed !== 'boolean' ||
                    typeof item.createdAt !== 'string') {
                    throw new Error('Invalid item format in imported data');
                }
            }

            // Save the imported data
            this.saveItems(importedData);
            return importedData;
        } catch (error) {
            console.error('Import error:', error);
            throw error;
        }
    }
}