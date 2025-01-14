import './index.less';

import { WithFalse } from '../typings';
import { defineComponent, PropType, SetupContext, VNodeChild } from 'vue';
import { getPropsSlot } from '../utils';

export type Links = WithFalse<
  {
    key?: string;
    title: VNodeChild | JSX.Element;
    href: string;
    blankTarget?: boolean;
  }[]
>;

export interface GlobalFooterProps {
  links?: Links;
  copyright?: VNodeChild | JSX.Element;
  prefixCls?: string;
}

const hasLinks = (props: GlobalFooterProps, slots: Record<string, any>) => {
  if (
    props.links === null ||
    props.links === false ||
    (Array.isArray(props.links) && props.links.length <= 0) ||
    slots.links === undefined
  ) {
    return false;
  }
  return true;
};

const hasCopyright = (props: GlobalFooterProps, slots: Record<string, any>) => {
  if (props.copyright === null || props.copyright === false || slots.copyright === undefined) {
    return false;
  }
  return true;
};

export default defineComponent({
  name: 'GlobalFooter',
  props: {
    links: [Array, Boolean] as PropType<Links>,
    copyright: {
      type: [String, Object, Function, Boolean] as PropType<VNodeChild | JSX.Element>,
      default: () => undefined,
    },
    prefixCls: {
      type: String,
      default: 'ant-pro',
    },
  },
  setup(props: GlobalFooterProps, { slots }: SetupContext) {
    if (hasLinks(props, slots) && hasCopyright(props, slots)) {
      console.warn('[pro-layout]: GlobalFooter required `links` or `copyright`');
      return () => null;
    }

    const baseClassName = `${props.prefixCls}-global-footer`;

    return () => {
      const links = getPropsSlot(slots, props, 'links');
      const copyright = getPropsSlot(slots, props, 'copyright');

      return (
        <footer class={baseClassName}>
          {links && (
            <div class={`${baseClassName}-links`}>
              {(props.links &&
                props.links.map(link => (
                  <a
                    key={link.key}
                    title={link.key}
                    target={link.blankTarget ? '_blank' : '_self'}
                    href={link.href}
                  >
                    {link.title}
                  </a>
                ))) ||
                links}
            </div>
          )}
          {copyright && <div class={`${baseClassName}-copyright`}>{copyright}</div>}
        </footer>
      );
    };
  },
});
