import React from 'react';
import {
  CheckCircleOutlined,
  CheckCircleFilled,
  WarningOutlined,
  WarningFilled,
  InfoCircleOutlined,
  InfoCircleFilled,
  ExclamationCircleFilled,
  CloseCircleOutlined,
  CloseCircleFilled,
  CloseOutlined,
  LoadingColored,
  UserOutlined,
  UserFilled,
  CartOutlined,
  SearchOutlined,
  PhoneOutlined,
  MenuOutlined,
  BellOutlined,
  BellFilled,
  SettingOutlined,
  StarFilled,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  ArrowRightUpOutlined,
  ArrowRightDownOutlined,
  DownOutlined,
  UpOutlined,
  RightOutlined,
  LeftOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  EditOutlined,
  EditFilled,
  DeleteOutlined,
  DeleteFilled,
  PlusOutlined,
  EyeOutlined,
  EyeCloseOutlined,
  CalendarOutlined,
  ClockOutlined,
  FileOutlined,
  FolderOutlined,
  ImageOutlined,
  DownloadOutlined,
  UploadOutlined,
} from '@shulex/icons';

export type IconType =
  | 'check-circle'
  | 'check-circle-filled'
  | 'warning'
  | 'warning-filled'
  | 'exclamation-circle'
  | 'info-circle'
  | 'info-circle-filled'
  | 'close-circle'
  | 'close-circle-filled'
  | 'close'
  | 'loading'
  | 'user'
  | 'user-filled'
  | 'cart'
  | 'search'
  | 'home'
  | 'phone'
  | 'menu'
  | 'bell'
  | 'bell-filled'
  | 'setting'
  | 'star'
  | 'star-filled'
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'down'
  | 'up'
  | 'right'
  | 'left'
  | 'caret-down'
  | 'caret-up'
  | 'caret-left'
  | 'caret-right'
  | 'edit'
  | 'edit-filled'
  | 'delete'
  | 'delete-filled'
  | 'plus'
  | 'eye'
  | 'eye-close'
  | 'calendar'
  | 'clock'
  | 'file'
  | 'folder'
  | 'image'
  | 'download'
  | 'upload';

const iconMap: Record<IconType, React.ComponentType<any>> = {
  'check-circle': CheckCircleOutlined,
  'check-circle-filled': CheckCircleFilled,
  'warning': WarningOutlined,
  'warning-filled': WarningFilled,
  'exclamation-circle': ExclamationCircleFilled,
  'info-circle': InfoCircleOutlined,
  'info-circle-filled': InfoCircleFilled,
  'close-circle': CloseCircleOutlined,
  'close-circle-filled': CloseCircleFilled,
  'close': CloseOutlined,
  'loading': LoadingColored,
  'user': UserOutlined,
  'user-filled': UserFilled,
  'cart': CartOutlined,
  'search': SearchOutlined,
  'home': FolderOutlined, // 使用 folder 代替 home
  'phone': PhoneOutlined,
  'menu': MenuOutlined,
  'bell': BellOutlined,
  'bell-filled': BellFilled,
  'setting': SettingOutlined,
  'star': StarFilled,
  'star-filled': StarFilled,
  'arrow-right': ArrowRightOutlined,
  'arrow-left': ArrowLeftOutlined,
  'arrow-up': ArrowRightUpOutlined,
  'arrow-down': ArrowRightDownOutlined,
  'down': DownOutlined,
  'up': UpOutlined,
  'right': RightOutlined,
  'left': LeftOutlined,
  'caret-down': CaretDownOutlined,
  'caret-up': CaretUpOutlined,
  'caret-left': CaretLeftOutlined,
  'caret-right': CaretRightOutlined,
  'edit': EditOutlined,
  'edit-filled': EditFilled,
  'delete': DeleteOutlined,
  'delete-filled': DeleteFilled,
  'plus': PlusOutlined,
  'eye': EyeOutlined,
  'eye-close': EyeCloseOutlined,
  'calendar': CalendarOutlined,
  'clock': ClockOutlined,
  'file': FileOutlined,
  'folder': FolderOutlined,
  'image': ImageOutlined,
  'download': DownloadOutlined,
  'upload': UploadOutlined,
};

export interface IconProps {
  type: IconType;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Icon: React.FC<IconProps> = ({
  type,
  size = 16,
  color,
  className = '',
  style,
  onClick,
}) => {
  const IconComponent = iconMap[type];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found`);
    return null;
  }

  const iconStyle: React.CSSProperties = {
    fontSize: `${size}px`,
    color,
    ...style,
  };

  return (
    <IconComponent
      className={className}
      style={iconStyle}
      onClick={onClick}
    />
  );
};

export default Icon;
