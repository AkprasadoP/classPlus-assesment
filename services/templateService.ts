import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { MOCK_TEMPLATES, Template } from '../constants/mockData';

export const fetchTemplates = async (): Promise<Template[]> => {
  try {
    if (!db) {
      throw new Error('Firestore is not initialized (missing environment variables).');
    }
    const querySnapshot = await getDocs(collection(db, 'templates'));
    if (querySnapshot.empty) {
      console.warn('No templates found in Firestore, falling back to mock data.');
      return MOCK_TEMPLATES;
    }
    
    const templates = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Template[];
    
    return templates;
  } catch (error) {
    console.warn('Failed to fetch from Firestore. Falling back to mock templates:', error);
    return MOCK_TEMPLATES;
  }
};
