import { Link } from '@tanstack/react-router';
import { useCartStore } from '@web/store/cartStore';
import { useModalStore } from '@web/store/modalStore';
import { Search, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import React from 'react';

const NavBar: React.FC = () => {
  const { setModalPath } = useModalStore((state) => state);
  const { cart } = useCartStore((state) => state);
  return (
    <div className="w-full max-w-[1220px] min-h-full mx-auto gap-6 py-6 px-4 sm:px-8">
      <div className="flex justify-between">
        <div>
          <Search strokeWidth={'1px'} />
        </div>
        <div>
          <Link to="/">
            <h1 className="font-bold">Suprasy</h1>
          </Link>
        </div>
        <div className="flex gap-[20px]">
          <button>
            <User strokeWidth={'1px'} />
          </button>

          <button
            className="relative"
            onClick={() => {
              setModalPath({ modal: 'cart' });
            }}
          >
            <ShoppingBag strokeWidth={'1px'} />

            {cart && cart.length > 0 && (
              <div className="absolute top-[-5px] right-[-8px] bg-red-500 text-white rounded-full text-sm px-1">
                {cart.length}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
