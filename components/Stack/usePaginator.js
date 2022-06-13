import useList from 'react-use/lib/useList';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

const LIMIT = 2;

const usePaginator = (data, limit = LIMIT, loop = false) => {
  const [initial, {removeAt, push}] = useList(data);

  const goToNext = () => {
    if (loop) {
      return push(initial.shift());
    }
    return removeAt(0);
  };

  const ended = initial.length === 0;

  return [initial.slice(0, limit), {goToNext, ended}];
};

export default usePaginator;
