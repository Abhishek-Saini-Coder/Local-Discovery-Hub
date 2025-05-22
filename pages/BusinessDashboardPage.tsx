
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { Business, User, CatalogueItem } from '../types';
import { Button } from '../components/common/Button';
import { PlusCircleIcon } from '../components/icons/PlusCircleIcon';
import { EditIcon } from '../components/icons/EditIcon';
import { TrashIcon } from '../components/icons/TrashIcon';
import { EyeIcon } from '../components/icons/EyeIcon';
// import { ListBulletIcon } from '../components/icons/ListBulletIcon'; // Not used currently
import { StarIcon } from '../components/icons/StarIcon';
import { CatalogueItemForm } from '../components/CatalogueItemForm'; 
import { Modal } from '../components/common/Modal'; 

interface BusinessDashboardPageProps {
  businesses: Business[];
  currentUser: User;
  onAddCatalogueItem: (businessId: string, item: CatalogueItem) => void;
  onUpdateCatalogueItem: (businessId: string, item: CatalogueItem) => void;
  onDeleteCatalogueItem: (businessId: string, itemId: string) => void;
}

export const BusinessDashboardPage: React.FC<BusinessDashboardPageProps> = ({ 
    businesses, 
    currentUser,
    onAddCatalogueItem,
    onUpdateCatalogueItem,
    onDeleteCatalogueItem
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogueItem | null>(null);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const openModalForNew = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (businessId: string, item: CatalogueItem) => {
    setSelectedBusinessId(businessId);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setSelectedBusinessId(null);
  };

  const handleCatalogueSubmit = (itemData: Omit<CatalogueItem, 'id'>) => {
    if (!selectedBusinessId) return;

    if (editingItem) { 
      onUpdateCatalogueItem(selectedBusinessId, { ...editingItem, ...itemData });
    } else { 
      const newItem: CatalogueItem = {
        id: Date.now().toString(),
        ...itemData,
      };
      onAddCatalogueItem(selectedBusinessId, newItem);
    }
    closeModal();
  };


  if (!businesses || businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-20rem)]"> {/* Ensure vertical centering too */}
        <h1 className="text-4xl font-bold text-text-header mb-6">Welcome, {currentUser.name}!</h1>
        <p className="text-xl text-text-body mb-8">You haven't listed any businesses yet.</p>
        <Link
          to="/add-listing"
          className="inline-flex items-center justify-center text-lg py-3 px-6 font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95 bg-brand-primary text-white hover:bg-brand-primary-hover focus:ring-brand-primary"
        >
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create Your First Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border-color">
        <h1 className="text-4xl font-bold text-text-header">Business Dashboard</h1>
        <p className="mt-2 text-lg text-text-body">Manage your listings, catalogue, and reviews.</p>
      </header>

      {businesses.map(business => (
        <section key={business.id} className="bg-card-bg p-6 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-brand-primary">{business.name}</h2>
              <p className="text-sm text-text-muted">{business.category} - {business.location}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
              <Link to={`/business/${business.id}`}>
                <Button variant="ghost" size="sm"><EyeIcon className="h-4 w-4 mr-1"/>View</Button>
              </Link>
              {/* TODO: Update AddListingPage to handle edit by passing business.id as a prop or query param */}
              {/* <Link to={`/add-listing?edit=${business.id}`}>  */}
              <Button variant="secondary" size="sm" onClick={() => alert('Edit listing feature coming soon!')}><EditIcon className="h-4 w-4 mr-1"/>Edit Listing</Button>
              {/* </Link> */}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-text-body mb-3">Catalogue Items</h3>
            {business.catalogueItems.length > 0 ? (
              <ul className="space-y-3">
                {business.catalogueItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md hover:bg-slate-100">
                    <div>
                      <p className="font-semibold text-slate-700">{item.name} <span className="text-text-muted text-sm">- {item.price}</span></p>
                      <p className="text-xs text-slate-600">{item.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => openModalForEdit(business.id, item)} aria-label={`Edit ${item.name}`}>
                        <EditIcon className="h-4 w-4"/>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteCatalogueItem(business.id, item.id)} className="text-red-500 hover:text-red-700" aria-label={`Delete ${item.name}`}>
                        <TrashIcon className="h-4 w-4"/>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-text-muted text-sm">No catalogue items added yet.</p>
            )}
            <Button variant="primary" size="sm" className="mt-4" onClick={() => openModalForNew(business.id)}>
              <PlusCircleIcon className="h-5 w-5 mr-2"/> Add Catalogue Item
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-medium text-text-body mb-3">Reviews Overview</h3>
            {business.reviews.length > 0 ? (
              <div className="flex items-center space-x-2 text-sm text-text-muted">
                <StarIcon className="h-5 w-5 text-amber-400 fill-amber-400"/>
                <span>Average Rating: <strong className="text-text-body">{business.averageRating?.toFixed(1) || 'N/A'}</strong></span>
                <span>({business.reviews.length} reviews)</span>
              </div>
            ) : (
              <p className="text-text-muted text-sm">No reviews yet.</p>
            )}
          </div>
        </section>
      ))}
      
      {isModalOpen && selectedBusinessId && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? "Edit Catalogue Item" : "Add New Catalogue Item"}>
          <CatalogueItemForm 
            onSubmit={handleCatalogueSubmit} 
            initialData={editingItem || undefined} 
            onCancel={closeModal}
            // Pass business context for AI if available from the selectedBusinessId
            businessName={businesses.find(b => b.id === selectedBusinessId)?.name}
            businessCategory={businesses.find(b => b.id === selectedBusinessId)?.category}
          />
        </Modal>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/add-listing"
          className="inline-flex items-center justify-center text-lg py-3 px-6 font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-95 bg-brand-accent text-white hover:bg-brand-accent-hover focus:ring-brand-accent"
        >
            <PlusCircleIcon className="h-6 w-6 mr-2" /> Add Another Business Listing
        </Link>
      </div>
    </div>
  );
};
