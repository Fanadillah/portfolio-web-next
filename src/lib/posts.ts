import { db } from './firebase';
import { Portfolio } from '@/types/portfolio';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    where,
    increment,
    Timestamp,
    limit,
    startAfter,
    DocumentData,
    Query
} from 'firebase/firestore';
import { cache } from 'react';

interface cacheItem<T> {
    data: T;
    timestamp: number;
}

class PostsCache {
    private cache = new Map<string, cacheItem<any>>();
    private cacheDuration = 5 * 60 * 1000; //5 menit

    get<T>(key: string): T | null {
        const item = this.cache.get(key);
        if (!item) return null;

        if(Date.now() - item.timestamp > this.cacheDuration) {
            this.cache.delete(key);
            return null;
        }
        return item.data as T;
    }

    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    delete(key: string): void {
        this.cache.clear();
    }

    clearListCache(): void {
        const keysToDelete: string[] = [];
        this.cache.forEach((_, key) => {
            if (key.startsWith('portfolios_list_') || key.startsWith('paginated_portfolios_')) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach(key => this.cache.delete(key));
    }
}

const postsCache = new PostsCache();

// CREATE PORTFOLIO
export async function createPortfolio(data: Omit<Portfolio, 'id' | 'views'>) {
    try {
        const sanitized: any = {}
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) sanitized[key] = value;
        });

        const docRef = await addDoc(collection(db, 'portfolio'), {
            ...sanitized,
            createdAt: Timestamp.now()
        });

        postsCache.clearListCache();
        return docRef.id;
    } catch (error) {
        console.error('Error creating portfolio:', error);
        throw error;
    }
}

// GET ALL PORTFOLIO
export async function getAllPortfolio(limitCount?: number) {
    try{
        const cacheKey  = limitCount ? `portfolio_limit${limitCount}` : 'portfolio_all';
    
        // mencoba ambil dari cache
        const cached = postsCache.get<Portfolio[]>(cacheKey);
        if(cached) {
            return cached;
        }
    
        //query ke firestore
        let q: Query = query(
            collection(db, 'portfolio'),
            orderBy('createdAt')
        );
    
        if (limitCount) {
            q = query(q, limit(limitCount));
        }
    
        // ambil data ke firestore
        const querySnapshot = await getDocs(q);
        const allPortfolio = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Portfolio[];
    
        // simpan di cache
        postsCache.set(cacheKey, allPortfolio)
        return allPortfolio
    }catch(error) {
        console.error("Error getting portofolio: ", error)
        throw error
    }
}
//get Portfolio BY ID
export async function getPortfolio(id: string): Promise<Portfolio | null> {
    try {
        const cacheKey = `post_${id}`;

        const cached = postsCache.get<Portfolio>(cacheKey);
        if (cached) {
            return cached;
        }

        const docRef = doc(db, "portfolio", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const data = docSnap.data() as Omit<Portfolio, "id">;
        const portfolio: Portfolio = { id: docSnap.id, ...data};

        postsCache.set(cacheKey, portfolio);

        return portfolio;
    }catch (error) {
        console.error("Error getting portfolio:", error)
        throw error;
    }
}

//update portfolio
export async function updatePortfolio(id: string, data: Partial<Portfolio>) {
    try {
        const docRef = doc(db, 'portfolio', id);
        await updateDoc(docRef, {
            ...data
        });

        postsCache.delete(`post_${id}`);
        postsCache.clearListCache();
    } catch (error) {
        console.error("Error updating portfolio: ", error);
        throw error
    }
}


// delete portfolio
export async function deletePortfolio(id: string) {
    try{
        const docRef = doc(db, 'portfolio', id);
        await deleteDoc(docRef);

        //clear cache
        postsCache.delete(`post_${id}`);
        postsCache.clearListCache();
    }catch(error) {
        console.error("Error deleting portfolio: ", error);
        throw error
    }
}