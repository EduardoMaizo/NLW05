import { createContext, ReactNode, useContext, useState }  from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    file:{
        duration: number;
        url: string;
    }
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode:Episode) => void;
    playList: (list: Episode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPLayerState: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hastPrevious: boolean;
    
};

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toggleLoop() {
        setIsLooping(!isLooping);
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling);
    }

    function setPlayingState(state: boolean){
        setIsPlaying(state);
    }

    function clearPLayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hastPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

    function playPrevious() {
        if(hastPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function playNext() {
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }
    return (
        <PlayerContext.Provider 
            value={{
                episodeList, 
                currentEpisodeIndex, 
                isPlaying, 
                isLooping,
                isShuffling,
                play, 
                togglePlay, 
                toggleLoop, 
                toggleShuffle,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                clearPLayerState,
                hasNext,
                hastPrevious,
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}