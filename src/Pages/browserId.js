// generate or retrieve a unique browser ID from localStorage
export function getBrowserId() {
  let id = localStorage.getItem('browserId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('browserId', id);
  }
  return id;
}
