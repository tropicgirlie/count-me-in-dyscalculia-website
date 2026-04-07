import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Lock,
  BookOpen,
  ShoppingCart,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Save,
  X,
  GripVertical,
  ExternalLink,
  Eye,
  EyeOff,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import {
  type Book,
  type StoreProduct,
  getBooks,
  saveBooks,
  getStoreProducts,
  saveStoreProducts,
} from "../lib/data-store";
import { toast } from "sonner@2.0.3";
import logo from "figma:asset/7df1fcf1a964339a60566b3dcb8f4a1327784680.png";

// Simple client-side password gate
const ADMIN_PASS_KEY = "cmi_admin_auth";
const ADMIN_PASSWORD = "countmein2025"; // Change this to your preferred password

type Tab = "books" | "store";

const bookCategories = [
  "Educational Resource",
  "Academic Research",
  "Cognitive Science",
  "Practical Guide",
  "Educational Guide",
  "Teaching Resource",
  "Clinical Reference",
  "Personal Narrative",
  "Popular Science",
];

const storeCategories: StoreProduct["category"][] = [
  "timers",
  "math",
  "organization",
  "kitchen",
  "focus",
];

const storeCategoryLabels: Record<StoreProduct["category"], string> = {
  timers: "Timers & Clocks",
  math: "Math Tools",
  organization: "Organization",
  kitchen: "Kitchen & Measurement",
  focus: "Focus & Sensory",
};

// ─── Login Gate ───
function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_PASS_KEY, "true");
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-custom">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl mb-2">Admin Access</h1>
            <p className="text-muted-foreground text-sm">
              Enter your password to manage site content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm mb-2"
                style={{ fontWeight: 500 }}
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <Button type="submit" className="w-full btn-primary py-3">
              <Lock className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Book Form ───
function BookForm({
  book,
  onSave,
  onCancel,
}: {
  book: Book | null;
  onSave: (book: Book) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Book>(
    book || {
      id: `book-${Date.now()}`,
      title: "",
      author: "",
      year: new Date().getFullYear().toString(),
      category: "Educational Resource",
      rating: 4.0,
      description: "",
      audience: "",
      isbn: "",
      publisher: "",
      image: "",
      link: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      toast.error("Title and author are required");
      return;
    }
    onSave(form);
  };

  const fieldClass =
    "w-full px-3 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";
  const labelClass = "block text-sm mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Title *
          </label>
          <input
            className={fieldClass}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. The Dyscalculia Toolkit"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Author *
          </label>
          <input
            className={fieldClass}
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            placeholder="e.g. Ronit Bird"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Year
          </label>
          <input
            className={fieldClass}
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="2024"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Category
          </label>
          <select
            className={fieldClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {bookCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className={fieldClass}
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Description
        </label>
        <textarea
          className={`${fieldClass} min-h-[80px] resize-y`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description of the book..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Audience
          </label>
          <input
            className={fieldClass}
            value={form.audience}
            onChange={(e) => setForm({ ...form, audience: e.target.value })}
            placeholder="e.g. Educators, Parents"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Publisher
          </label>
          <input
            className={fieldClass}
            value={form.publisher}
            onChange={(e) => setForm({ ...form, publisher: e.target.value })}
            placeholder="e.g. SAGE Publications"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            ISBN
          </label>
          <input
            className={fieldClass}
            value={form.isbn}
            onChange={(e) => setForm({ ...form, isbn: e.target.value })}
            placeholder="e.g. 9781446287132"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Book Link (Amazon, publisher, etc.)
          </label>
          <input
            className={fieldClass}
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://www.amazon.com/dp/..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Cover Image URL{" "}
          <span className="text-muted-foreground font-normal">
            (leave blank for default)
          </span>
        </label>
        <input
          className={fieldClass}
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          <Save className="h-4 w-4 mr-1" />
          {book ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
}

// ─── Store Product Form ───
function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: StoreProduct | null;
  onSave: (product: StoreProduct) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<StoreProduct>(
    product || {
      id: `product-${Date.now()}`,
      name: "",
      description: "",
      whyItHelps: "",
      category: "timers",
      price: "",
      image: "",
      amazonUrl: "",
      rating: 4.0,
      badge: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Product name is required");
      return;
    }
    onSave(form);
  };

  const fieldClass =
    "w-full px-3 py-2.5 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm";
  const labelClass = "block text-sm mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Product Name *
          </label>
          <input
            className={fieldClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Time Timer MOD"
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Price
          </label>
          <input
            className={fieldClass}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="e.g. ~\u20AC35"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Category
          </label>
          <select
            className={fieldClass}
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value as StoreProduct["category"],
              })
            }
          >
            {storeCategories.map((c) => (
              <option key={c} value={c}>
                {storeCategoryLabels[c]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            className={fieldClass}
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: parseFloat(e.target.value) || 0 })
            }
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontWeight: 500 }}>
            Badge{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <input
            className={fieldClass}
            value={form.badge || ""}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            placeholder="e.g. Top Pick"
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Description
        </label>
        <textarea
          className={`${fieldClass} min-h-[80px] resize-y`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What is this product?"
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Why It Helps (dyscalculia-specific benefit)
        </label>
        <textarea
          className={`${fieldClass} min-h-[60px] resize-y`}
          value={form.whyItHelps}
          onChange={(e) => setForm({ ...form, whyItHelps: e.target.value })}
          placeholder="Explain how this helps someone with dyscalculia..."
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Amazon Affiliate Link
        </label>
        <input
          className={fieldClass}
          value={form.amazonUrl}
          onChange={(e) => setForm({ ...form, amazonUrl: e.target.value })}
          placeholder="https://www.amazon.com/dp/...?tag=YOUR_TAG"
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontWeight: 500 }}>
          Product Image URL
        </label>
        <input
          className={fieldClass}
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          <Save className="h-4 w-4 mr-1" />
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}

// ─── Main Admin Panel ───
function AdminPanel() {
  const [tab, setTab] = useState<Tab>("books");
  const [books, setBooks] = useState<Book[]>([]);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null | "new">(null);
  const [editingProduct, setEditingProduct] = useState<
    StoreProduct | null | "new"
  >(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setBooks(getBooks());
    setProducts(getStoreProducts());
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_PASS_KEY);
    window.location.reload();
  };

  // ─── Book handlers ───
  const handleSaveBook = (book: Book) => {
    const updated = editingBook === "new"
      ? [...books, book]
      : books.map((b) => (b.id === book.id ? book : b));
    setBooks(updated);
    saveBooks(updated);
    setEditingBook(null);
    toast.success(editingBook === "new" ? "Book added!" : "Book updated!");
  };

  const handleDeleteBook = (id: string) => {
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    saveBooks(updated);
    setDeleteConfirm(null);
    toast.success("Book removed");
  };

  const moveBook = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= books.length) return;
    const updated = [...books];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setBooks(updated);
    saveBooks(updated);
  };

  // ─── Product handlers ───
  const handleSaveProduct = (product: StoreProduct) => {
    const updated = editingProduct === "new"
      ? [...products, product]
      : products.map((p) => (p.id === product.id ? product : p));
    setProducts(updated);
    saveStoreProducts(updated);
    setEditingProduct(null);
    toast.success(
      editingProduct === "new" ? "Product added!" : "Product updated!"
    );
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveStoreProducts(updated);
    setDeleteConfirm(null);
    toast.success("Product removed");
  };

  const moveProduct = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= products.length) return;
    const updated = [...products];
    [updated[index], updated[newIndex]] = [
      updated[newIndex],
      updated[index],
    ];
    setProducts(updated);
    saveStoreProducts(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div
          className="max-w-[1200px] mx-auto flex items-center justify-between"
          style={{ padding: "0.75rem clamp(1.5rem, 4vw, 3rem)" }}
        >
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Count Me In"
                className="w-9 h-9 rounded-lg"
              />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Count Me In
              </span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Admin
              </Badge>
              <span className="text-sm hidden sm:inline" style={{ fontWeight: 600 }}>
                Content Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="text-xs">
                <Eye className="h-3.5 w-3.5 mr-1" />
                View Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-muted-foreground"
            >
              <LogOut className="h-3.5 w-3.5 mr-1" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-card border-b">
        <div
          className="max-w-[1200px] mx-auto flex"
          style={{ padding: "0 clamp(1.5rem, 4vw, 3rem)" }}
        >
          <button
            onClick={() => setTab("books")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm border-b-2 transition-colors ${
              tab === "books"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontWeight: 500 }}
          >
            <BookOpen className="h-4 w-4" />
            Books
            <Badge variant="outline" className="text-xs ml-1">
              {books.length}
            </Badge>
          </button>
          <button
            onClick={() => setTab("store")}
            className={`flex items-center gap-2 px-5 py-3.5 text-sm border-b-2 transition-colors ${
              tab === "store"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            style={{ fontWeight: 500 }}
          >
            <ShoppingCart className="h-4 w-4" />
            Store Products
            <Badge variant="outline" className="text-xs ml-1">
              {products.length}
            </Badge>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main
        className="max-w-[1200px] mx-auto py-8"
        style={{ padding: "2rem clamp(1.5rem, 4vw, 3rem)" }}
      >
        {/* ─── BOOKS TAB ─── */}
        {tab === "books" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Manage Books</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add, edit, or reorder the books displayed in the Books
                  section on the homepage.
                </p>
              </div>
              <Button
                className="btn-primary"
                onClick={() => setEditingBook("new")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Book
              </Button>
            </div>

            {/* Add/Edit Form */}
            {editingBook !== null && (
              <Card className="border-primary/30 shadow-custom">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>
                    {editingBook === "new" ? "Add New Book" : "Edit Book"}
                  </h3>
                  <BookForm
                    book={editingBook === "new" ? null : editingBook}
                    onSave={handleSaveBook}
                    onCancel={() => setEditingBook(null)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Books List */}
            <div className="space-y-3">
              {books.map((book, index) => (
                <Card
                  key={book.id}
                  className="border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Reorder */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button
                          onClick={() => moveBook(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move up"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </button>
                        <span className="text-xs text-muted-foreground/50">
                          #{index + 1}
                        </span>
                        <button
                          onClick={() => moveBook(index, 1)}
                          disabled={index === books.length - 1}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move down"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      {/* Book Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4
                              className="text-sm truncate"
                              style={{ fontWeight: 600 }}
                            >
                              {book.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              by {book.author} ({book.year}) &middot;{" "}
                              {book.publisher}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge
                              variant="outline"
                              className="text-xs hidden sm:inline-flex"
                            >
                              {book.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {book.rating}/5
                            </Badge>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                          {book.description}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          {book.link && (
                            <a
                              href={book.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View link
                            </a>
                          )}
                          {book.isbn && (
                            <span className="text-xs text-muted-foreground/60">
                              ISBN: {book.isbn}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingBook(book)}
                          className="h-8 w-8 p-0"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        {deleteConfirm === book.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteBook(book.id)}
                              className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">Delete</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirm(book.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {books.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No books yet. Add your first one above.</p>
              </div>
            )}
          </div>
        )}

        {/* ─── STORE TAB ─── */}
        {tab === "store" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Manage Store Products</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add, edit, or reorder products displayed in the Store
                  page. Remember to use your Amazon affiliate tag.
                </p>
              </div>
              <Button
                className="btn-primary"
                onClick={() => setEditingProduct("new")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Product
              </Button>
            </div>

            {/* Affiliate Tag Reminder */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p
                  className="text-sm text-amber-800"
                  style={{ fontWeight: 600 }}
                >
                  Amazon Affiliate Tag Reminder
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  Make sure each Amazon URL includes your affiliate tag (e.g.{" "}
                  <code className="bg-amber-100 px-1 rounded">
                    ?tag=your-tag-20
                  </code>
                  ). Replace <code className="bg-amber-100 px-1 rounded">YOUR_AFFILIATE_TAG</code> in
                  existing products.
                </p>
              </div>
            </div>

            {/* Add/Edit Form */}
            {editingProduct !== null && (
              <Card className="border-primary/30 shadow-custom">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4" style={{ fontWeight: 600 }}>
                    {editingProduct === "new"
                      ? "Add New Product"
                      : "Edit Product"}
                  </h3>
                  <ProductForm
                    product={
                      editingProduct === "new" ? null : editingProduct
                    }
                    onSave={handleSaveProduct}
                    onCancel={() => setEditingProduct(null)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="space-y-3">
              {products.map((product, index) => (
                <Card
                  key={product.id}
                  className="border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Reorder */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button
                          onClick={() => moveProduct(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move up"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </button>
                        <span className="text-xs text-muted-foreground/50">
                          #{index + 1}
                        </span>
                        <button
                          onClick={() => moveProduct(index, 1)}
                          disabled={index === products.length - 1}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move down"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      </div>

                      {/* Thumbnail */}
                      {product.image && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 hidden sm:block">
                          <img
                            src={product.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4
                              className="text-sm truncate"
                              style={{ fontWeight: 600 }}
                            >
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {product.price} &middot;{" "}
                              {storeCategoryLabels[product.category]}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {product.badge && (
                              <Badge className="bg-accent/10 text-accent border-accent/20 text-xs">
                                {product.badge}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {product.rating}/5
                            </Badge>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                          {product.description}
                        </p>

                        {product.amazonUrl && (
                          <div className="mt-2">
                            {product.amazonUrl.includes(
                              "YOUR_AFFILIATE_TAG"
                            ) ? (
                              <span className="text-xs text-amber-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Missing affiliate tag
                              </span>
                            ) : (
                              <a
                                href={product.amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                              >
                                <ExternalLink className="h-3 w-3" />
                                Amazon link
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingProduct(product)}
                          className="h-8 w-8 p-0"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDeleteProduct(product.id)
                              }
                              className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              <span className="text-xs">Delete</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteConfirm(null)}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteConfirm(product.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p>No products yet. Add your first one above.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Export ───
export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(ADMIN_PASS_KEY) === "true"
  );

  if (!authenticated) {
    return <LoginGate onLogin={() => setAuthenticated(true)} />;
  }

  return <AdminPanel />;
}
