/*
    This JavaScript file is part of a software package that is licensed under the GNU General Public License (GPL).
    For more details about the GNU GPL, see <https://www.gnu.org/licenses/>.
*/

document.getElementById('saveButton').addEventListener('click', () => {
    let newName = document.getElementById('nameInput').value;
    chrome.storage.sync.set({ 'userName': newName }, function() {
		console.log('New name is ' + newName);    
	});
});
