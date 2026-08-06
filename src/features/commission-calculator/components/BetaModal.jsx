export default function BetaModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative max-w-md w-full rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#1a1a1e] to-[#0f0f12] p-5 sm:p-6 shadow-2xl shadow-amber-500/10 mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Warning Icon */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/20 flex items-center justify-center mb-3 sm:mb-4">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-white mb-2">
                        Beta Calculator
                    </h2>

                    <p className="text-amber-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                        This is a baseline estimation, not a fixed standard
                    </p>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 sm:mb-6">
                        The calculator suggests a fair starting point based on your time, experience, and estimated market rates. You always set your own final price — charge more if your portfolio justifies it, adjust for returning clients, or price differently for passion projects.
                    </p>

                    <div className="mb-5 sm:mb-6 rounded-xl border border-white/5 bg-white/5 p-3 flex items-start gap-2.5">
                        
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                            <strong className="text-amber-400 font-semibold">Help us improve:</strong> These estimates are continuously improving. Help us match real market rates by sharing your feedback!
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                    >
                        Got it, let's go!
                    </button>

                    <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                        <span className="text-amber-400/80">Your art, your rules.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}