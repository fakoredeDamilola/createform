class LocalStorageService {
  exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  update<T>(key: string, updatedData: Partial<T>): void {
    const existingData = this.get<T>(key);
    if (existingData) {
      const mergedData = { ...existingData, ...updatedData };
      this.set(key, mergedData);
    } else {
      throw new Error(`No data found for the key "${key}" to update.`);
    }
  }

  create<T>(key: string, value: T): void {
    if (!this.exists(key)) {
      this.set(key, value);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}

export const localStorageService = new LocalStorageService();
