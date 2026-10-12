import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';

  isModalOpen = false;
  isEditMode = false;
  currentProduct: Product = { name: '', price: 0, quantity: 0 };
  modalTitle = '';

  // Alertes
  alertMessage = '';
  alertType = 'success'; // 'success' | 'error' | 'info'

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  searchProducts() {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe(data => {
        this.filteredProducts = data;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  openAddModal() {
    this.isEditMode = false;
    this.modalTitle = 'Ajouter un produit';
    this.currentProduct = { name: '', price: 0, quantity: 0 };
    this.isModalOpen = true;
  }

  openEditModal(product: Product) {
    this.isEditMode = true;
    this.modalTitle = 'Modifier le produit';
    this.currentProduct = { ...product };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Affiche une alerte
  showAlert(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }

  submitProduct() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.currentProduct.id!, this.currentProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.closeModal();
            this.showAlert('Produit modifié avec succès !', 'success');
          },
          error: () => this.showAlert('Erreur lors de la modification', 'error')
        });
    } else {
      this.productService.createProduct(this.currentProduct)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.closeModal();
            this.showAlert('Produit ajouté avec succès !', 'success');
          },
          error: () => this.showAlert('Erreur lors de l\'ajout', 'error')
        });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
          this.showAlert('Produit supprimé avec succès !', 'success');
        },
        error: () => this.showAlert('Erreur lors de la suppression', 'error')
      });
    }
  }
}
