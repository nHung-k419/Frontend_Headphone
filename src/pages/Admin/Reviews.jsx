import React, { useState } from 'react';
import { 
  FiStar, 
  FiMessageSquare, 
  FiEye, 
  FiCheck, 
  FiX, 
  FiTrash2,
  FiSearch, 
  FiFilter, 
  FiMoreVertical,
  FiUser,
  FiCalendar,
  FiThumbsUp,
  FiThumbsDown,
  FiFlag,
  FiTrendingUp,
  FiTrendingDown,
  FiHeart,
  FiShare2,
  FiEdit3
} from 'react-icons/fi';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { GetAllReviews } from '../../services/Admin/Reviews';
import { useQuery, useQueryClient } from '@tanstack/react-query';
const Reviews = () => {
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample reviews data
  const reviews = [
    {
      _id: '1',
      productId: 'prod_001',
      productName: 'iPhone 15 Pro',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      rating: 5,
      title: 'Excellent phone with amazing camera!',
      comment: 'I have been using this phone for 3 months now and I am absolutely impressed with its performance. The camera quality is outstanding, especially in low light conditions. The build quality feels premium and the battery life easily lasts a full day.',
      status: 'approved',
      createdAt: '2024-03-10T10:30:00Z',
      helpful: 24,
      notHelpful: 2,
      reported: false,
      verified: true,
      images: ['img1.jpg', 'img2.jpg']
    },
    {
      _id: '2',
      productId: 'prod_002',
      productName: 'MacBook Air M3',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      rating: 4,
      title: 'Great laptop for work',
      comment: 'Perfect for my daily work needs. Fast, lightweight, and great battery life. Only minor complaint is that it can get warm during intensive tasks.',
      status: 'pending',
      createdAt: '2024-03-09T15:20:00Z',
      helpful: 12,
      notHelpful: 1,
      reported: false,
      verified: true,
      images: []
    },
    {
      _id: '3',
      productId: 'prod_003',
      productName: 'AirPods Pro',
      customerName: 'Mike Davis',
      customerEmail: 'mike@example.com',
      rating: 2,
      title: 'Disappointing sound quality',
      comment: 'Expected much better sound quality for the price. The noise cancellation is okay but not as good as advertised. Would not recommend.',
      status: 'flagged',
      createdAt: '2024-03-08T09:15:00Z',
      helpful: 5,
      notHelpful: 18,
      reported: true,
      verified: false,
      images: []
    },
    {
      _id: '4',
      productId: 'prod_001',
      productName: 'iPhone 15 Pro',
      customerName: 'Emily Chen',
      customerEmail: 'emily@example.com',
      rating: 5,
      title: 'Love everything about it!',
      comment: 'This is hands down the best phone I have ever owned. The speed, camera, display - everything is perfect. Highly recommend to anyone looking for a premium smartphone.',
      status: 'approved',
      createdAt: '2024-03-07T14:45:00Z',
      helpful: 31,
      notHelpful: 0,
      reported: false,
      verified: true,
      images: ['img3.jpg']
    },
    {
      _id: '5',
      productId: 'prod_004',
      productName: 'iPad Pro',
      customerName: 'David Wilson',
      customerEmail: 'david@example.com',
      rating: 3,
      title: 'Good but expensive',
      comment: 'The tablet works well for basic tasks but feels overpriced for what it offers. The display is nice but I expected more features for this price point.',
      status: 'pending',
      createdAt: '2024-03-06T11:30:00Z',
      helpful: 8,
      notHelpful: 4,
      reported: false,
      verified: true,
      images: []
    }
  ];
  
  const {data : reviewsData} = useQuery({
    queryKey: ['reviews'],
    queryFn: GetAllReviews
  })
console.log(reviewsData);

  const handleApprove = (reviewId) => {
    console.log('Approve review:', reviewId);
  };

  const handleReject = (reviewId) => {
    console.log('Reject review:', reviewId);
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      console.log('Delete review:', reviewId);
    }
  };

  const handleFlag = (reviewId) => {
    console.log('Flag review:', reviewId);
  };

  const filteredReviews = reviewsData?.result.filter(review => {
    const nullUserr = review?.Id_User !== null ? review?.Id_User?.Name : null;
    const nullProduct = review?.Id_Product !== null ? review?.Id_Product?.Name : null;
    const matchesFilter = selectedFilter === 'all' || review.status === selectedFilter;
    const matchesRating = selectedRating === 'all' || review.Rating.toString() === selectedRating;
    const matchesSearch = review?.Id_User !== null && review?.Id_User?.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review?.Id_Product !== null && review?.Id_Product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.Content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesRating && matchesSearch && nullUserr && nullProduct;
  });
console.log(filteredReviews);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'flagged': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StarRating = ({ rating, size = 'w-4 h-4' }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star}>
            {star <= rating ? (
              <HiStar className={`${size} text-yellow-400`} />
            ) : (
              <HiOutlineStar className={`${size} text-gray-300`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Reviews Management
              </h1>
              <p className="text-gray-600 mt-2">Monitor and manage customer reviews and feedback</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-200">
                <div className="flex items-center space-x-2">
                  <FiCheck className="w-5 h-5" />
                  <span>Bulk Approve</span>
                </div>
              </button>
              
              <button className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-200">
                <div className="flex items-center space-x-2">
                  <FiTrash2 className="w-5 h-5" />
                  <span>Delete Selected</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Reviews</p>
                <h3 className="text-2xl font-bold text-gray-900">{reviewsData?.result.length}</h3>
                <p className="text-xs text-gray-400 mt-1">All time</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                <FiMessageSquare className="w-8 h-8 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Avg Rating</p>
                <h3 className="text-2xl font-bold text-yellow-600">
                  {(reviewsData?.result.reduce((sum, r) => sum + r.Rating, 0) / reviewsData?.result.length).toFixed(1)}
                </h3>
                <StarRating rating={Math.round(reviewsData?.result.reduce((sum, r) => sum + r.Rating, 0) / reviewsData?.result.length)} />
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl group-hover:from-yellow-200 group-hover:to-amber-200 transition-colors">
                <FiStar className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-600">
                  {/* {reviews.filter(r => r.status === 'pending').length} */}
                  null
                </h3>
                <p className="text-xs text-gray-400 mt-1">Awaiting approval</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl group-hover:from-yellow-200 group-hover:to-orange-200 transition-colors">
                <FiCalendar className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Approved</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {reviewsData?.result.filter(r => r).length}
                </h3>
                <p className="text-xs text-gray-400 mt-1">Live reviews</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl group-hover:from-green-200 group-hover:to-emerald-200 transition-colors">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/20 group hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Flagged</p>
                <h3 className="text-2xl font-bold text-red-600">
                  {/* {reviews.filter(r => r.status === 'flagged').length} */}
                  null
                </h3>
                <p className="text-xs text-gray-400 mt-1">Need attention</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl group-hover:from-red-200 group-hover:to-pink-200 transition-colors">
                <FiFlag className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal for review details */}
        {selectedReview && (
          <Modal onClose={() => setSelectedReview(null)}>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Product Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900">{selectedReview?.Id_Product.Name}</p>
                      <p className="text-sm text-gray-600">Product ID: {selectedReview?.Id_Product._id}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-semibold">{selectedReview.Id_Product.Name}</span>
                        {/* {selectedReview.verified && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Verified
                          </span>
                        )} */}
                      </div>
                      <div className="flex items-center">
                        <FiMessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{selectedReview?.Id_User.Email}</span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span>{new Date(selectedReview.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Review Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <StarRating rating={selectedReview.Rating} size="w-6 h-6" />
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor("approved")}`}>
                          {/* {selectedReview.status.charAt(0).toUpperCase() + selectedReview.status.slice(1)} */}
                          Approved
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{selectedReview.title}</h4>
                        <p className="text-gray-700 leading-relaxed">{selectedReview.Content}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <FiThumbsUp className="w-4 h-4 mr-1" />
                            <span>{selectedReview.helpful}</span>
                          </div>
                          <div className="flex items-center">
                            <FiThumbsDown className="w-4 h-4 mr-1" />
                            <span>{selectedReview.notHelpful}</span>
                          </div>
                        </div>
                        {selectedReview.reported && (
                          <span className="text-red-500 font-medium">Reported</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {selectedReview.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(selectedReview._id)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(selectedReview._id)}
                          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleFlag(selectedReview._id)}
                      className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Flag
                    </button>
                    <button
                      onClick={() => handleDelete(selectedReview._id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* Main Reviews Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Customer Reviews</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <FiSearch className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="flagged">Flagged</option>
                </select>

                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredReviews?.map((review) => (
              <div
                key={review._id}
                className="p-6 hover:bg-amber-50/50 transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {review?.Id_User.Name.charAt(0).toUpperCase() }
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{review.Id_User.Name}</h3>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{review?.Id_Product.Name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.Rating} />
                        <span className="text-sm text-gray-600">({review.Rating}/5)</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed line-clamp-2">{review.Content}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiCalendar className="w-4 h-4 mr-1" />
                          <span>{new Date(review.CreateAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <FiThumbsUp className="w-4 h-4 mr-1" />
                          <span>{review.helpful}</span>
                        </div>
                        <div className="flex items-center">
                          <FiThumbsDown className="w-4 h-4 mr-1" />
                          <span>{review.notHelpful}</span>
                        </div>
                        {review.reported && (
                          <div className="flex items-center text-red-500">
                            <FiFlag className="w-4 h-4 mr-1" />
                            <span>Reported</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                        </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    
                    {review.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(review._id)}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(review._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing</span>
                <span className="mx-1 font-semibold text-gray-900">1</span>
                <span>to</span>
                {/* <span className="mx-1 font-semibold text-gray-900">{filteredReviews.length}</span> */}
                <span>of</span>
                <span className="mx-1 font-semibold text-gray-900">{reviews.length}</span>
                <span>results</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-amber-600 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;