// Reference to input field and plus button
let inPut = document.querySelector('input');
let plusButton = document.querySelector('.plus');

// Event listener for the plus button to add new content
setInterval(()=>{
    if (inPut.value.trim() !== '')
    {
        plusButton.style.display='block'
    }
    else
    {
        plusButton.style.display='none'
    }
})
function addItem()
{
        if (inPut.value.trim() !== '') { // Trim input to avoid adding empty content
            // Create a new content div
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            const id = Date.now(); // Unique identifier based on timestamp
            contentDiv.setAttribute('data-id', id);
            
            contentDiv.innerHTML = `
                <p class="paragraph">${inPut.value}</p>
                <div class="icon">
                    <div class="del"><i class="ri-close-circle-fill del"></i></div>
                    <div class="do "><i class="ri-edit-fill do"></i></div>
                </div>
            `;
            
            document.body.appendChild(contentDiv);
            inPut.value = '';
            inPut.focus();
            
            // Save to localStorage with the unique ID
            localStorage.setItem(`val${id}`, contentDiv.innerHTML);
    };
}
plusButton.addEventListener('click', addItem)

inPut.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});
// Load content from localStorage on page load
window.addEventListener('load', () => {
    for (let i = 0; i <localStorage.length ; i++) {
        const key = localStorage.key(i);
        console.log(i)
        if (key.startsWith('val')) {
            const contentHTML = localStorage.getItem(key);
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            contentDiv.innerHTML = contentHTML;

            // Restore the unique ID to ensure proper deletion
            const id = key.replace('val', '');
            contentDiv.setAttribute('data-id', id);
            document.body.appendChild(contentDiv);

                const paragraph = contentDiv.querySelector('.paragraph');
                const paragraph_value = localStorage.getItem(paragraph.innerHTML) 

                if (paragraph_value==='true') {
                    paragraph.classList.add('lineThrough');
                }
            }
    }
});

// Event listener for the document body to handle clicks on the delete button
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('del')) {
        // Find the closest '.content' element
        const contentDiv = event.target.closest('.content');
        console.log(contentDiv)
        if (contentDiv) {
            // Retrieve the unique ID from the contentDiv
            const contentId = contentDiv.getAttribute('data-id');
            
            // Remove the contentDiv from the document body
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    document.body.removeChild(contentDiv);
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
            
            // Remove the corresponding item from localStorage
            if (contentId) {
                
                localStorage.removeItem(`val${contentId}`);
            }
        }
    }
});
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('do')) {
        const contentDiv = event.target.closest('.content');
        const paragraph = contentDiv.querySelector('.paragraph');
        paragraph.classList.toggle('lineThrough');
        var CheckLineThrough=paragraph.classList.contains('lineThrough')
        localStorage.setItem(paragraph.textContent,CheckLineThrough);
    }
});
