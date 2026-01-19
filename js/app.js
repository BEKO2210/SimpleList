class ShoppingListApp {
    constructor() {
        this.items = ShoppingListStorage.getItems();
        this.editingItemId = null;
        this.confirmCallback = null;

        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.shoppingListEl = document.getElementById('shopping-list');
        this.emptyStateEl = document.getElementById('empty-state');
        this.clearCompletedBtn = document.getElementById('clear-completed');
        this.itemModal = document.getElementById('item-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.itemInput = document.getElementById('item-input');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.saveBtn = document.getElementById('save-btn');

        // Confirm dialog elements
        this.confirmModal = document.getElementById('confirm-modal');
        this.confirmMessage = document.getElementById('confirm-message');
        this.confirmCancel = document.getElementById('confirm-cancel');
        this.confirmOk = document.getElementById('confirm-ok');
    }

    bindEvents() {
        this.clearCompletedBtn.addEventListener('click', () => this.handleClearCompleted());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.saveBtn.addEventListener('click', () => this.handleSaveItem());

        this.itemModal.addEventListener('click', (e) => {
            if (e.target === this.itemModal) this.closeModal();
        });

        this.itemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSaveItem();
        });

        // Confirm dialog events
        this.confirmCancel.addEventListener('click', () => this.closeConfirm(false));
        this.confirmOk.addEventListener('click', () => this.closeConfirm(true));
        this.confirmModal.addEventListener('click', (e) => {
            if (e.target === this.confirmModal) this.closeConfirm(false);
        });
    }

    // Custom confirm dialog
    showConfirm(message) {
        return new Promise((resolve) => {
            this.confirmMessage.textContent = message;
            this.confirmModal.classList.remove('hidden');
            this.confirmCallback = resolve;
        });
    }

    closeConfirm(result) {
        this.confirmModal.classList.add('hidden');
        if (this.confirmCallback) {
            this.confirmCallback(result);
            this.confirmCallback = null;
        }
    }

    render() {
        this.shoppingListEl.innerHTML = '';

        if (this.items.length === 0) {
            this.emptyStateEl.classList.remove('hidden');
        } else {
            this.emptyStateEl.classList.add('hidden');
            this.items.forEach((item, index) => {
                const itemElement = this.createItemElement(item, index);
                this.shoppingListEl.appendChild(itemElement);
            });
        }
    }

    createItemElement(item, index) {
        const li = document.createElement('li');
        li.className = `list-item ${item.completed ? 'completed' : ''}`;
        li.dataset.id = item.id;
        li.style.animationDelay = `${index * 0.05}s`;

        li.innerHTML = `
            <div class="checkbox-wrapper" data-id="${item.id}">
                <svg width="28" height="28" viewBox="0 0 95 95" class="checkbox-svg">
                    <rect x="30" y="20" width="50" height="50" stroke="currentColor" fill="transparent" stroke-width="2"></rect>
                    <g transform="translate(0,-952.36222)">
                        <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="currentColor" stroke-width="3" fill="none" class="path1 ${item.completed ? 'checked' : ''}"></path>
                    </g>
                </svg>
            </div>
            <span class="item-text">${this.escapeHtml(item.text)}</span>
            <div class="item-actions">
                <button class="edit-btn" aria-label="Edit item">✎</button>
                <button class="delete-btn" aria-label="Delete item">🗑️</button>
            </div>
        `;

        const checkboxWrapper = li.querySelector('.checkbox-wrapper');
        const itemText = li.querySelector('.item-text');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        // Only toggle when clicking checkbox or text
        checkboxWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleItem(item.id, li);
        });

        itemText.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleItem(item.id, li);
        });

        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openEditModal(item);
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteItem(item.id, li);
        });

        return li;
    }

    openAddModal() {
        this.editingItemId = null;
        this.modalTitle.textContent = 'Add Item';
        this.itemInput.value = '';
        this.itemModal.classList.remove('hidden');
        setTimeout(() => this.itemInput.focus(), 100);
    }

    openEditModal(item) {
        this.editingItemId = item.id;
        this.modalTitle.textContent = 'Edit Item';
        this.itemInput.value = item.text;
        this.itemModal.classList.remove('hidden');
        setTimeout(() => this.itemInput.focus(), 100);
    }

    closeModal() {
        this.itemModal.classList.add('hidden');
        this.editingItemId = null;
    }

    handleSaveItem() {
        const text = this.itemInput.value.trim();
        if (!text) {
            this.showToast('Please enter an item name', 'error');
            return;
        }

        if (this.editingItemId) {
            this.items = ShoppingListStorage.updateItem(this.editingItemId, text);
        } else {
            this.items = ShoppingListStorage.addItem(text);
        }

        this.closeModal();
        this.render();
    }

    toggleItem(id, element) {
        // Add completing animation
        element.classList.add('completing');

        setTimeout(() => {
            this.items = ShoppingListStorage.toggleItem(id);
            this.render();
        }, 200);
    }

    async deleteItem(id, element) {
        const confirmed = await this.showConfirm('Delete this item from your list?');

        if (confirmed) {
            element.classList.add('fade-out');
            setTimeout(() => {
                this.items = ShoppingListStorage.deleteItem(id);
                this.render();
            }, 300);
        }
    }

    async handleClearCompleted() {
        const completedItems = this.items.filter(item => item.completed);

        if (completedItems.length === 0) {
            this.showToast('No completed items to clear', 'info');
            return;
        }

        const message = completedItems.length === 1
            ? 'Clear 1 completed item?'
            : `Clear ${completedItems.length} completed items?`;

        const confirmed = await this.showConfirm(message);

        if (confirmed) {
            // Animate completed items out
            const completedElements = document.querySelectorAll('.list-item.completed');
            completedElements.forEach((el, i) => {
                el.style.animationDelay = `${i * 0.05}s`;
                el.classList.add('fade-out');
            });

            setTimeout(() => {
                this.items = ShoppingListStorage.clearCompleted();
                this.render();
                this.showToast('Completed items cleared', 'success');
            }, 300);
        }
    }

    showToast(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
        setTimeout(() => toast.remove(), 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const app = new ShoppingListApp();

    // Header input
    const headerInput = document.getElementById('header-input');
    const addSubmitButton = document.getElementById('add-item-submit');

    const addItemFromHeader = () => {
        const text = headerInput.value.trim();
        if (text) {
            app.items = ShoppingListStorage.addItem(text);
            app.render();
            headerInput.value = '';
        }
    };

    headerInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItemFromHeader();
    });

    addSubmitButton?.addEventListener('click', addItemFromHeader);

    // Export/Import
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const importFileInput = document.getElementById('import-file');

    exportBtn?.addEventListener('click', () => ShoppingListStorage.exportData());

    importBtn?.addEventListener('click', () => importFileInput.click());

    importFileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    app.items = ShoppingListStorage.importData(event.target.result);
                    app.render();
                    app.showToast('Data imported successfully!', 'success');
                } catch (error) {
                    app.showToast('Error importing data', 'error');
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    });

    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('SW registered'))
            .catch((err) => console.log('SW registration failed:', err));
    }

    // PWA Install Popup
    let deferredPrompt;
    const installPopup = document.getElementById('install-popup');
    const installBtn = document.getElementById('install-btn');
    const installClose = document.getElementById('install-close');

    // Check if already installed or dismissed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = localStorage.getItem('installDismissed');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Show popup after 3 seconds if not installed and not dismissed
        if (!isInstalled && !isDismissed) {
            setTimeout(() => {
                installPopup?.classList.remove('hidden');
            }, 3000);
        }
    });

    installBtn?.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            app.showToast('App installed successfully!', 'success');
        }

        deferredPrompt = null;
        installPopup?.classList.add('hidden');
    });

    installClose?.addEventListener('click', () => {
        installPopup?.classList.add('hidden');
        localStorage.setItem('installDismissed', 'true');
    });

    // Close popup when clicking outside
    installPopup?.addEventListener('click', (e) => {
        if (e.target === installPopup) {
            installPopup.classList.add('hidden');
            localStorage.setItem('installDismissed', 'true');
        }
    });
});
