const filters = document.querySelector('.filters');
const projects = Array.from(document.querySelectorAll('.project'));
const status = document.querySelector('#filter-status');

filters.hidden = false;
filters.addEventListener('click', (event) => {
  const selected = event.target.closest('button[data-filter]');
  if (!selected) return;

  const filter = selected.dataset.filter;
  for (const button of filters.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === selected));
  }
  for (const project of projects) {
    project.hidden = filter !== 'all' && !project.dataset.category.split(' ').includes(filter);
  }
  const count = projects.filter((project) => !project.hidden).length;
  status.textContent = count === 1 ? '1 trabalho apresentado.' : count + ' trabalhos apresentados.';
});

const dialog = document.querySelector('#project-dialog');
const content = document.querySelector('#project-content');
const closeButton = dialog.querySelector('.close');
let opener;

document.querySelector('.gallery').addEventListener('click', (event) => {
  const selected = event.target.closest('button[data-project]');
  if (!selected) return;

  const template = document.getElementById(selected.dataset.project);
  content.replaceChildren(template.content.cloneNode(true));
  opener = selected;
  dialog.showModal();
  dialog.scrollTop = 0;
  closeButton.focus();
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    dialog.close();
  }
});
dialog.addEventListener('close', () => {
  content.replaceChildren();
  opener?.focus();
});
