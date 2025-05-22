
import React, { useState, useCallback, useEffect } from 'react';
import { Business, BusinessCategory, BusinessFormData } from '../types'; 
import { CATEGORIES_AVAILABLE } from '../constants';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { generateBusinessDescription } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon'; 

interface BusinessFormProps {
  onSubmit: (businessData: Business) => void; 
  initialData?: Business; 
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ onSubmit, initialData }) => {
  
  const getInitialFormData = (): BusinessFormData => {
    if (initialData) {
      return {
        name: initialData.name,
        category: initialData.category,
        description: initialData.description,
        contactEmail: initialData.contactEmail || '',
        contactPhone: initialData.contactPhone || '',
        location: initialData.location,
        imageUrl: initialData.imageUrl || '',
      };
    }
    return {
      name: '',
      category: CATEGORIES_AVAILABLE[0],
      description: '',
      contactEmail: '',
      contactPhone: '',
      location: '',
      imageUrl: '',
    };
  };

  const [formData, setFormData] = useState<BusinessFormData>(getInitialFormData());
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [initialData]);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as BusinessCategory })); 
  }, []);

  const handleGenerateDescription = useCallback(async () => {
    if (!formData.name || !formData.category) {
      setError('Please enter business name and category to generate description.');
      return;
    }
    setError(null);
    setIsGeneratingDesc(true);
    try {
      const desc = await generateBusinessDescription(formData.name, formData.category);
      setFormData(prev => ({ ...prev, description: desc }));
    } catch (err) {
      console.error("Error generating description:", err);
      setError(err instanceof Error ? err.message : 'Failed to generate description. Please try again or write your own.');
    } finally {
      setIsGeneratingDesc(false);
    }
  }, [formData.name, formData.category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.description || !formData.location) {
        setError('Please fill in all required fields: Name, Category, Description, and Location.');
        return;
    }
    setError(null);
    
    const submittedBusiness: Business = {
      ...(initialData || {}), 
      id: initialData?.id || Date.now().toString(),
      ...formData,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now().toString()}/600/300`,
      reviews: initialData?.reviews || [], 
      catalogueItems: initialData?.catalogueItems || [], 
    };
    onSubmit(submittedBusiness);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-red-600 bg-red-100 p-4 rounded-lg border border-red-300 text-sm">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., The Cozy Corner Cafe"
        />
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={CATEGORIES_AVAILABLE.map(cat => ({ value: cat, label: cat }))}
          required
        />
      </div>
      
      <div>
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          placeholder="Tell customers what makes your business special..."
        />
         <Button
          type="button"
          onClick={handleGenerateDescription}
          disabled={isGeneratingDesc || !formData.name || !formData.category}
          variant="custom" // Using custom for amber
          className="mt-3 text-sm bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 inline-flex items-center space-x-2 rounded-md"
        >
          <SparklesIcon className="h-5 w-5"/>
          <span>{isGeneratingDesc ? 'Generating...' : 'Generate with AI'}</span>
        </Button>
        {isGeneratingDesc && <p className="text-sm text-brand-primary mt-2">AI is crafting a description... please wait.</p>}
      </div>
      
      <Input
        label="Location (e.g., Address or Neighborhood)"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        placeholder="123 Main Street, Anytown or Downtown District"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="youremail@example.com"
        />
        <Input
          label="Contact Phone (Optional)"
          name="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="555-123-4567"
        />
      </div>
      
      <Input
        label="Image URL (Optional)"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="https://example.com/your-business-image.jpg"
      />
      <p className="text-xs text-text-muted">If no image URL is provided, a placeholder image will be used.</p>
      
      {/* Button uses brand-primary by default */}
      <Button type="submit" variant="primary" className="w-full text-lg py-3">
        {initialData ? 'Update Listing' : 'Add My Listing'}
      </Button>
    </form>
  );
};
