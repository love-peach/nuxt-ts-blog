import createApiReposity from '~/assets/js/createApiReposity';

export default ({ $axios }, inject) => {
  const repositoryWithAxios = createApiReposity($axios);

  const repositories = {
    blogs: repositoryWithAxios('/api/blogs'),
    users: repositoryWithAxios('/api/users'),
    categories: repositoryWithAxios('/api/categories'),
  };

  inject('myApi', repositories);
};
