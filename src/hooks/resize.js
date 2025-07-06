import React, { useState, useCallback, useMemo, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

export const useResize = (Element, dependencies = []) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [elemNode, setElemNode] = useState(null);

  const handleNode = (node) => {
    if (node) {
      const bc = node.getBoundingClientRect();
      setWidth(Math.floor(bc.width));
      setHeight(Math.floor(bc.height));
    } else {
      setWidth(0);
      setHeight(0);
    }
  };

  useLayoutEffect(() => {
    handleNode(elemNode);
    window.addEventListener('resize', () => handleNode(elemNode));
    return () => window.removeEventListener('resize', () => handleNode(elemNode));
  }, [elemNode, ...dependencies]);

  const handleRef = useCallback(
    (node) => {
      handleNode(node);
      setElemNode(node);
    },
    [...dependencies]
  );

  const CompWithRef = useMemo(() => {
    const Comp = ({ children, ...props }) => (
      <Element {...props} ref={handleRef}>
        {children}
      </Element>
    );

    Comp.defaultProps = {
      children: null,
    };

    Comp.propTypes = {
      children: PropTypes.node,
    };

    return Comp;
  }, []);

  return { width, height, Comp: CompWithRef };
};

export const useBrowserResize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleSize = () => {
    setWidth(Math.floor(window.innerWidth));
    setHeight(Math.floor(window.innerHeight));
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  return { width, height };
};

export default useResize;
