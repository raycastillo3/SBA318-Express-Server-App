document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-review-btn');
  
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const form = button.closest('.delete-review-form');
        const reviewId = form.dataset.reviewId;
        const productId = new URLSearchParams(window.location.search).get('productId');
  
        try {
          const response = await fetch(`/api/reviews/${reviewId}?productId=${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            form.closest('.review-card').remove();
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
          }
        } catch (error) {
          console.error('Failed to delete review:', error);
          alert('Failed to delete review. Please try again later.');
        }
      });
    });
  });
  
  async function updateReview(event, reviewId) {
    event.preventDefault(); 
  
    const form = event.target.closest('form');
    const formData = new FormData(form);
  
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        location.reload(); 
      } else {
        const error = await response.json();
        alert(`Error updating review: ${error.message}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to update review. Please try again later.');
    }
  }
  