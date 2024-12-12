import { ROLE_ICONS, ROLE_COLORS, ROLE_DESCRIPTIONS } from '@/lib/constants/role-icons';
import { UserRole } from '@/types/auth';
import { classNames } from '@/lib/utils';

interface RoleIconProps {
  role: UserRole;
  className?: string;
  showTooltip?: boolean;
}

export function RoleIcon({ role, className = '', showTooltip = false }: RoleIconProps) {
  const Icon = ROLE_ICONS[role];
  const color = ROLE_COLORS[role];
  const description = ROLE_DESCRIPTIONS[role];

  return (
    <div className="inline-flex items-center" title={showTooltip ? description : undefined}>
      <Icon
        className={classNames(
          'h-5 w-5',
          color,
          className
        )}
        aria-hidden="true"
      />
    </div>
  );
}
