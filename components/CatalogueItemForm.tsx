import React, { useState, useEffect, useCallback } from 'react';
import { CatalogueItem } from '../types';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { Button } from './common/Button';
import { generateCatalogueItemDescription } from '../services/geminiService'; // Assuming this exists
import { SparklesIcon } from './icons/SparklesIcon';


interface CatalogueItemFormProps {
  onSubmit: (itemData: Omit<CatalogueItem, 'id'>) => void;
  initialData?: CatalogueItem;
  onCancel?: () => void; // For use in modals
  businessName?: string; // Optional, for AI prompt context
  businessCategory?: string; // Optional, for AI prompt context
}

export const CatalogueItemForm: React.FC<CatalogueItemFormProps> = ({ 
    onSubmit, 
    initialData, 
    onCancel,
    businessName = "this business", // Default context for AI
    businessCategory = "general" // Default context for AI
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);


  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setImageUrl(initialData.imageUrl || '');
    } else {
      // Reset for new item form
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
    }
  }, [initialData]);

  const handleGenerateDescription = useCallback(async () => {
    if (!name) {
      setError('Please enter the item name to generate a description.');
      return;
    }
    setError(null);
    setIsGeneratingDesc(true);
    try {
      const desc = await generateCatalogueItemDescription(name, businessName, businessCategory);
      setDescription(desc);
    } catch (err) {
      console.error("Error generating item description:", err);
      setError(err instanceof Error ? err.message : 'Failed to generate description.');
    } finally {
      setIsGeneratingDesc(false);
    }
  }, [name, businessName, businessCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) { // Basic validation
      setError('Name and Price are required.');
      return;
    }
    setError(null);
    onSubmit({ name, description, price, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      {error && <p className="text-red-600 bg-red-100 p-3 rounded-md text-sm">{error}</p>}
      <Input
        label="Item Name"
        name="itemName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="e.g., Signature Coffee Blend"
      />
      <div>
        <Textarea
          label="Description"
          name="itemDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Briefly describe the item"
        />
        <Button
          type="button"
          onClick={handleGenerateDescription}
          disabled={isGeneratingDesc || !name}
          variant="custom"
          size="sm"
          className="mt-2 text-xs bg-amber-500 hover:bg-amber-600 text-white py-1.5 px-3 inline-flex items-center space-x-1 rounded-md"
        >
          <SparklesIcon className="h-4 w-4"/>
          <span>{isGeneratingDesc ? 'Generating...' : 'AI Description'}</span>
        </Button>
        {isGeneratingDesc && <p className="text-xs text-primary mt-1">AI is working...</p>}
      </div>
      <Input
        label="Price"
        name="itemPrice"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        placeholder="e.g., $4.99 or Varies"
      />
      <Input
        label="Image URL (Optional)"
        name="itemImageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/item-image.jpg"
      />
      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {initialData ? 'Save Changes' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};