import { useState } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { setConnection } from '../redux/actions/connectionActions';
import socketConfig from '../config/socket.json';

/**
 * Socket.io setup
 * Initializes socket event listeners for communication
 * with the server
 */
const useSocket = (onConnect: Function) => {
	const dispatch = useDispatch();
	const [socket, setSocket] = useState<Socket | null>(null);

	/**
	 * Connect to the socket.io server.
	 */
	const connect = (): boolean => {
		try {
			// Socket.io setup
			const newSocket: Socket = io(socketConfig.serverAddress);
			newSocket.on('connect', () => {
				console.log('Connected to server.');
				dispatch(setConnection(true));
				onConnect();
			});
			newSocket.on('reconnect', () => {
				console.log('Re-established connection to server.');
				dispatch(setConnection(true));
				onConnect();
			});
			newSocket.on('disconnect', () => {
				console.error('Lost connection to server.');
				dispatch(setConnection(false));
			});
			setSocket(newSocket);
			return newSocket.connected;
		} catch (err) {
			console.error(err);
			setSocket(null);
			return false;
		}
	};

	const disconnect = () => {
		socket?.disconnect();
		dispatch(setConnection(false));
	};

	return { socket, connect, disconnect };
};

export default useSocket;
