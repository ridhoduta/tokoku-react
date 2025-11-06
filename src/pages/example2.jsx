import React, { useState } from 'react';
import { Package, Calendar, MapPin, ChevronRight, Search, Filter } from 'lucide-react';

export default function OrderListPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 'O-250921-AGPDDMI',
      status: 'processing',
      statusText: 'Sedang Diproses',
      date: 'Senin, 21 Agustus 2025',
      recipient: 'Anggraini Dita Mahesa',
      address: 'Jl. Plumeria Alba 97, Kota Singasari',
      products: [
        {
          name: 'Minyak Fortune 2 Liter',
          quantity: 1,
          price: 45000,
          originalPrice: 150000,
          discount: 10
        }
      ],
      total: 45000,
      points: 285
    },
    {
      id: 'O-250920-BHQWER',
      status: 'delivered',
      statusText: 'Terkirim',
      date: 'Minggu, 20 Agustus 2025',
      recipient: 'Anggraini Dita Mahesa',
      address: 'Jl. Plumeria Alba 97, Kota Singasari',
      products: [
        {
          name: 'Minyak Fortune 2 Liter',
          quantity: 2,
          price: 45000,
          originalPrice: 150000,
          discount: 10
        }
      ],
      total: 90000,
      points: 570
    },
    {
      id: 'O-250915-CXZMNO',
      status: 'shipping',
      statusText: 'Dalam Pengiriman',
      date: 'Selasa, 15 Agustus 2025',
      recipient: 'Anggraini Dita Mahesa',
      address: 'Jl. Plumeria Alba 97, Kota Singasari',
      products: [
        {
          name: 'Minyak Fortune 2 Liter',
          quantity: 3,
          price: 45000,
          originalPrice: 150000,
          discount: 10
        }
      ],
      total: 135000,
      points: 855
    },
    {
      id: 'O-250910-DVWXYZ',
      status: 'cancelled',
      statusText: 'Dibatalkan',
      date: 'Kamis, 10 Agustus 2025',
      recipient: 'Anggraini Dita Mahesa',
      address: 'Jl. Plumeria Alba 97, Kota Singasari',
      products: [
        {
          name: 'Minyak Fortune 2 Liter',
          quantity: 1,
          price: 45000,
          originalPrice: 150000,
          discount: 10
        }
      ],
      total: 45000,
      points: 0
    }
  ];

  const statusColors = {
    processing: 'bg-blue-100 text-blue-700',
    shipping: 'bg-orange-100 text-orange-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700'
  };

  const filters = [
    { value: 'all', label: 'Semua' },
    { value: 'processing', label: 'Diproses' },
    { value: 'shipping', label: 'Dikirim' },
    { value: 'delivered', label: 'Selesai' },
    { value: 'cancelled', label: 'Dibatalkan' }
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  if (selectedOrder) {
    return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-4">Pesanan Saya</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari nomor pesanan atau produk..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-purple-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Pesanan</h3>
            <p className="text-gray-500">Belum ada pesanan dengan status ini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                          {order.statusText}
                        </span>
                        <span className="text-sm text-gray-500">{order.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" />
                  </div>

                  {/* Products */}
                  <div className="space-y-3 mb-4">
                    {order.products.map((product, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="text-center">
                            <div className="text-white font-bold text-xs">Fortune</div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-600">Jumlah: {product.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {order.address}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total Belanja</p>
                      <p className="text-lg font-bold text-purple-700">
                        Rp {order.total.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderDetailView({ order, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button 
            onClick={onBack}
            className="text-purple-700 hover:text-purple-800 font-semibold mb-4 flex items-center gap-2"
          >
            ← Kembali ke Daftar Pesanan
          </button>
          <h1 className="text-2xl font-bold mb-2">Detail Pesanan</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className={`px-3 py-1 rounded-full font-semibold ${
              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
              order.status === 'shipping' ? 'bg-orange-100 text-orange-700' :
              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }`}>
              {order.statusText}
            </span>
            <span className="text-gray-600">No Pesanan: {order.id}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-700" />
                Informasi Pengiriman
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Tanggal Pengiriman</p>
                    <p className="text-gray-600">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Alamat Pengiriman</p>
                    <p className="text-gray-600">
                      {order.recipient}<br />
                      {order.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Detail Produk</h2>
              {order.products.map((product, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg mb-3 last:mb-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">Fortune</div>
                      <div className="text-white text-xs">MINYAK GORENG</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-orange-400 text-white text-xs px-2 py-1 rounded">
                        {product.discount} %
                      </span>
                      <span className="font-bold">Rp {product.price.toLocaleString('id-ID')}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Jumlah: {product.quantity}</p>
                  </div>
                  
                  <div className="text-right font-bold">
                    Rp {(product.price * product.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* A-Point */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">A-Point</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>A-Poin Didapat</span>
                  <span className="font-semibold text-purple-700">{order.points} A-Poin</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Ringkasan Pembayaran</h2>
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Diskon</span>
                  <span className="text-green-600">Rp 0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongkir</span>
                  <span>Rp 0</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold text-purple-700">
                  Rp {order.total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {order.status === 'delivered' && (
              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors">
                Beli Lagi
              </button>
            )}
            {order.status === 'processing' && (
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Batalkan Pesanan
              </button>
            )}
            {order.status === 'shipping' && (
              <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-colors">
                Lacak Pesanan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}